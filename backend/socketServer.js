'use strict';

const jwt = require('jsonwebtoken');
const kurento = require('kurento-client');

const constants = require('./config/constants');

let users = {};
let rooms = {};

module.exports = function(server) {
  const io = require('socket.io')(server);

  io.use((socket, next) => {
    if (socket.handshake.query && socket.handshake.query.token) {
      jwt.verify(socket.handshake.query.token, constants.JWT_SECRET, (err, decoded) => {
        if (err) {
          return next(new Error('Auth error'));
        }
        socket.user = decoded;
        next();
      });
    } else {
      next(new Error('Auth error'));
    }
  });

  io.on('connection', socket => {
    socket.on('init', room => {
      joinRoom(socket, room, err => {
        if (err) {
          console.error(`join Room error ${err}`);
        }
      });
    });

    socket.on('chat message', message => {
      console.log('got message: ' + JSON.stringify(message));
      console.log('sending message to room: '+ socket.room);
      socket.to(socket.room).emit('chat message', message);
    });

    socket.on('message', message => {
      switch (message.id) {
        case 'receiveVideoFrom': {
          receiveVideoFrom(socket, message.sender, message.sdpOffer, (error) => {
            if (error) {
              console.error(error);
            }
          });
          break;
        }
        case 'onIceCandidate': {
          addIceCandidate(socket, message, (error) => {
            if (error) {
              console.error(error);
            }
          });
          break;
        }
        default: {
          socket.emit({ id: 'error', msg: `Invalid message ${message}`});
        }
      }
    });

    socket.on('disconnect', () => {
      leaveRoom(socket, error => {
        if (error) {
          console.error(error);
        }
      });
    });
  });
};

function joinRoom(socket, roomName, callback) {
  getRoom(roomName, (error, room) => {
    if (error) {
      callback(error);
      return;
    }

    join(socket, room, (err) => {
      if (err) {
        callback(err);
        return;
      }
      console.log(`join success : ${socket.user.email}`);
      callback();
    });
  });
}

function getRoom(roomName, callback) {
  let isNewRoom = ! (roomName in rooms);
  if (isNewRoom) {
    console.log(`create new room : ${roomName}`);
    getKurentoClient((error, kurentoClient) => {
      if (error) {
        return callback(error);
      }

      kurentoClient.create('MediaPipeline', (error, pipeline) => {
        if (error) {
          return callback(error);
        }

        const room = {
          name: roomName,
          pipeline,
          participants: {},
          kurentoClient
        };

        rooms[roomName] = room;
        callback(null, room);
      });
    });
  } else {
    console.log(`get existing room : ${roomName}`);
    callback(null, rooms[roomName]);
  }

}

function join(socket, room, callback) {
  socket.room = room.name;
  socket.join(room.name);

  const user = {
    id: socket.user.id,
    user: socket.user,
    name: socket.user.email,
    roomName: room.name,
    outgoingMedia: null,
    incomingMedia: {},
    iceCandidateQueue: {},
    socket
  };

  users[user.id] = user;

  room.pipeline.create('WebRtcEndpoint', (error, outgoingMedia) => {
    if (error) {
      console.error('could not create WebRtcEndpoint');
      if (room.participants.length === 0) {
        room.pipeline.release();
      }

      return callback(error);
    }

    outgoingMedia.setMaxVideoRecvBandwidth(300);
    outgoingMedia.setMinVideoRecvBandwidth(100);
    user.outgoingMedia = outgoingMedia;

    const iceCandidateQueue = user.iceCandidateQueue[user.name];
    if (iceCandidateQueue) {
      while(iceCandidateQueue.length) {
        const message = iceCandidateQueue.shift();
        console.error(`user: ${user.id} collect candidate for outgoing media`);
        user.outgoingMedia.addIceCandidate(message.candidate);
      }
    }

    user.outgoingMedia.on('OnIceCandidate', event => {
      const candidate = kurento.register.complexTypes.IceCandidate(event.candidate);
      user.socket.emit('message', {
        id: 'iceCandidate',
        name: user.id,
        candidate
      });
    });

    const usersInRoom = room.participants;

    let existingUsers = [];
    for (let i in usersInRoom) {
      if (usersInRoom[i].id !== user.id) {
        user.socket.emit('peer.connected', usersInRoom[i].user);
        usersInRoom[i].socket.emit('message', {
          id: 'newParticipantArrived',
          name: user.id
        });
        existingUsers.push(usersInRoom[i].id);
      }
    }

    user.socket.emit('message', {
      id: 'existingParticipants',
      data: existingUsers,
      roomName: room.name
    });

    room.participants[user.id] = user;

    user.socket.to(user.roomName).emit('peer.connected', user.user);

    callback(null, user);
  });

}

function receiveVideoFrom(socket, senderId, sdpOffer, callback) {
  const user = users[socket.user.id];
  const sender = users[senderId];

  getEndpointForUser(user, sender, (error, endpoint) => {
    if (error) {
      console.error(error);
      callback(error);
    }

    endpoint.processOffer(sdpOffer, (error, sdpAnswer) => {
      if (error) {
        console.error(error);
        return callback(error);
      }

      const data = {
        id: 'receiveVideoAnswer',
        name: sender.id,
        sdpAnswer
      };

      user.socket.emit('message', data);

      endpoint.gatherCandidates(error => {
        if (error) {
          return callback(error);
        }
      });

      return callback(null, sdpAnswer);
    });
  });
}

function getEndpointForUser(user, sender, callback) {
  if (user.id === sender.id) {
    return callback(null, user.outgoingMedia);
  }

  const incoming = user.incomingMedia[sender.id];
  if (incoming == null) {
    console.log(`user: ${user.id} create endpoint to receive video from : ${sender.id}`);
    getRoom(user.roomName, (error, room) => {
      if (error) {
        console.error(error);
        callback(error);
        return;
      }

      room.pipeline.create('WebRtcEndpoint', (error, incomingMedia) => {
        if (error) {
          if (Object.keys(room.participants).length === 0) {
            room.pipeline.release();
          }
          console.error(error);

          callback(error);

          return;
        }

        incomingMedia.setMaxVideoRecvBandwidth(300);
        incomingMedia.setMaxAudioRecvBandwidth(100);
        user.incomingMedia[sender.id] = incomingMedia;

        const iceCandidateQueue = user.iceCandidateQueue[sender.id];
        if (iceCandidateQueue) {
          while (iceCandidateQueue.length) {
            const message = iceCandidateQueue.shift();
            incomingMedia.addIceCandidate(message.candidate);
          }
        }

        incomingMedia.on('OnIceCandidate', event => {
          const candidate = kurento.register.complexTypes.IceCandidate(event.candidate);
          user.socket.emit('message', {
            id: 'iceCandidate',
            name: sender.id,
            candidate
          });
        });

        connectWebRtcEndpoints(sender.outgoingMedia, incomingMedia, callback);
      });
    });

  } else {
    connectWebRtcEndpoints(sender.outgoingMedia, incoming, callback);
  }
}

function leaveRoom(socket, callback) {
  const user = users[socket.id];

  if ( ! user) {
    return;
  }

  const room = rooms[user.roomName];

  if ( ! room) {
    return;
  }

  socket.leave(socket.room);
  socket.to(socket.room).emit('peer.disconnected', socket.user);
  console.log(socket.user.email, 'has left room', socket.room);

  const usersInRoom = room.participants;
  delete usersInRoom[user.id];
  user.outgoingMedia.release();

  for (let i in user.incomingMedia) {
    user.incomingMedia[i].release();
    delete user.incomingMedia[i];
  }

  const data = {
    id: 'participantLeft',
    name: user.name
  };

  for (let i in usersInRoom) {
    const otherUser = usersInRoom[i];
    if (otherUser.incomingMedia[user.id]) {
      otherUser.incomingMedia[user.id].release();
      delete otherUser.incomingMedia[user.id];
    }

    otherUser.socket.emit('message', data);
  }

  if (Object.keys(room.participants).length === 0) {
    room.pipeline.release();
    delete rooms[user.roomName];
  }

  socket.room = null;
}

function addIceCandidate(socket, message, callback) {
  const user = users[socket.user.id];
  if (user !== null) {
    const candidate = kurento.register.complexTypes.IceCandidate(message.candidate);
    if (message.sender === user.id) {
      if (user.outgoingMedia) {
        user.outgoingMedia.addIceCandidate(candidate);
      } else {
        user.iceCandidateQueue[message.sender].push({
          data: message,
          candidate
        });
      }
    } else {
      const webRtc = user.incomingMedia[message.sender];
      if (webRtc) {
        webRtc.addIceCandidate(candidate);
      } else {
        if (!user.iceCandidateQueue[message.sender]) {
          user.iceCandidateQueue[message.sender] = [];
        }
        user.iceCandidateQueue[message.sender].push({
          data: message,
          candidate
        });
      }
    }
    callback();
  } else {
    console.error(`ice candidate with no user received: ${message.sender}`);
    callback(new Error('addIceCandidate failed'));
  }
}

function getKurentoClient(callback) {
  kurento(constants.KURENTO_URI, (error, kurentoClient) => {
    if (error) {
      const message = `Could not find media server at address ${constants.KURENTO_URI}`;
      return callback(message);
    }

    callback(null, kurentoClient);
  });
}

function connectWebRtcEndpoints(source, sink, callback) {
  source.connect(sink, error => {
    if (error) {
      return callback(error);
    }

    return callback(null, sink);
  });
}
