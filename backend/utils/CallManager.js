'use strict';

const kurento = require('kurento-client');

const constants = require('../config/constants');

class CallManager {
  constructor() {
    this.rooms = new Map();
    this.users = new Map();
  }

  joinRoom(socket, roomName, callback) {
    this.getRoom(roomName, (error, room) => {
      if (error) {
        return callback(error);
      }

      this.join(socket, room, (err) => {
        return err ? callback(err) : callback();
      });
    });
  }

  join(socket, room, callback) {
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

    this.users.set(user.id, user);

    room.pipeline.create('WebRtcEndpoint', (error, outgoingMedia) => {
      if (error) {
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

  getRoom(roomName, callback) {
    if (this.rooms.has(roomName)) {
      callback(null, this.rooms.get(roomName));
    } else {
      this.createNewRoom(roomName, callback);
    }
  }

  createNewRoom(roomName, callback) {
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

        this.rooms.set(roomName, room);
        callback(null, room);
      });
    });
  }

  receiveVideoFrom(socket, senderId, sdpOffer, callback) {
    const user = this.users.get(socket.user.id);
    const sender = this.users.get(senderId);

    this.getEndpointForUser(user, sender, (error, endpoint) => {
      if (error) {
        return callback(error);
      }

      endpoint.processOffer(sdpOffer, (error, sdpAnswer) => {
        if (error) {
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

  getEndpointForUser(user, sender, callback) {
    if (user.id === sender.id) {
      return callback(null, user.outgoingMedia);
    }

    const incoming = user.incomingMedia[sender.id];
    if (incoming == null) {
      this.getRoom(user.roomName, (error, room) => {
        if (error) {
          return callback(error);
        }

        room.pipeline.create('WebRtcEndpoint', (error, incomingMedia) => {
          if (error) {
            if (Object.keys(room.participants).length === 0) {
              room.pipeline.release();
            }

            return callback(error);
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

  addIceCandidate(socket, message, callback) {
    const user = this.users.get(socket.user.id);

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
      callback(new Error('addIceCandidate failed'));
    }
  }

  leaveRoom(socket, callback) {
    const user = this.users.get(socket.id);

    if ( ! user) {
      return;
    }

    const room = this.rooms.get(user.roomName);

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
      this.rooms.delete(user.roomName);
    }

    socket.room = null;
  }
}

module.exports = CallManager;

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

