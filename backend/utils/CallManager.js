'use strict';

const kurento = require('kurento-client');

const MeetingManager = require('../modules/meeting/MeetingManager');

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

      user.outgoingMedia = outgoingMedia;

      this.setConstraintsOnMediaEndpoint(outgoingMedia);
      this.processIceCandidateQueue(user.iceCandidateQueue[user.name], outgoingMedia);
      this.setOnIceCandidateOnEndpoint(user.outgoingMedia, user.socket, user.id);

      this.notifyOthersOnJoin(room, user);

      room.participants.set(user.id, user);

      user.socket.to(user.roomName).emit('peer.connected', user.user);

      if (room.composite) {
        room.composite.createHubPort((error, hubPort) => {
          if (error) {
            console.error(error);
            return callback(error);
          }

          connectWebRtcEndpoints(outgoingMedia, hubPort, (error) => {
            if (error) {
              console.error(error);
              return callback(error);
            }

            connectWebRtcEndpoints(hubPort, room.recorderEndpoint, (error) => {
              if (error) {
                console.error(error);
                return callback(error);
              }

              return callback(null, user);
            });
          });

        });
      }
    });
  }

  notifyOthersOnJoin(room, user) {
    let existingUsers = [];

    for (let userInRoom of room.participants.values()) {
      if (userInRoom.id !== user.id) {
        user.socket.emit('peer.connected', userInRoom.user);
        userInRoom.socket.emit('message', {
          id: 'newParticipantArrived',
          name: user.id
        });
        existingUsers.push(userInRoom.id);
      }
    }

    user.socket.emit('message', {
      id: 'existingParticipants',
      data: existingUsers,
      roomName: room.name
    });
  }

  getRoom(roomName, callback) {
    if (this.rooms.has(roomName)) {
      callback(null, this.rooms.get(roomName));
    } else {
      this.createNewRoom(roomName, callback);
    }
  }

  async createNewRoom(roomName, callback) {
    const meetingManager = new MeetingManager();
    const meeting = await meetingManager.getMeeting(roomName);

    getKurentoClient((error, kurentoClient) => {
      if (error) {
        return callback(error);
      }

      kurentoClient.create('MediaPipeline', (error, pipeline) => {
        if (error) {
          return callback(error);
        }

        if (meeting.record) {
          pipeline.create('Composite', (error, composite) => {
            if (error) {
              return callback(error);
            }

            const recordParams = {
              uri: `file:///tmp/${roomName}.webm`
            };

            pipeline.create('RecorderEndpoint', recordParams, (error, recorderEndpoint) => {
              if (error) {
                return callback(error);
              }

              recorderEndpoint.record();

              const room = {
                name: roomName,
                pipeline,
                participants: new Map(),
                kurentoClient,
                composite,
                recorderEndpoint
              };

              this.rooms.set(roomName, room);
              callback(null, room);
            });
          });
        } else {
          const room = {
            name: roomName,
            pipeline,
            participants: new Map(),
            kurentoClient
          };

          this.rooms.set(roomName, room);
          callback(null, room);
        }
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
            if (Array.from(room.participants.values()).length === 0) {
              room.pipeline.release();
            }

            return callback(error);
          }

          user.incomingMedia[sender.id] = incomingMedia;

          this.setConstraintsOnMediaEndpoint(incomingMedia);
          this.processIceCandidateQueue(user.iceCandidateQueue[sender.id], incomingMedia);
          this.setOnIceCandidateOnEndpoint(incomingMedia, user.socket, sender.id);

          connectWebRtcEndpoints(sender.outgoingMedia, incomingMedia, callback);
        });
      });

    } else {
      connectWebRtcEndpoints(sender.outgoingMedia, incoming, callback);
    }
  }

  setConstraintsOnMediaEndpoint(mediaEndpoint) {
    mediaEndpoint.setMaxVideoRecvBandwidth(300);
    mediaEndpoint.setMaxAudioRecvBandwidth(100);
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

  async leaveRoom(socket, callback) {
    const user = this.users.get(socket.user.id);

    if ( ! user) {
      return;
    }

    const room = this.rooms.get(user.roomName);

    if ( ! room) {
      return;
    }

    socket.leave(socket.room);
    socket.to(socket.room).emit('peer.disconnected', socket.user);

    const usersInRoom = room.participants;
    room.participants.delete(user.id);
    user.outgoingMedia.release();

    for (let i in user.incomingMedia) {
      user.incomingMedia[i].release();
      delete user.incomingMedia[i];
    }

    const data = {
      id: 'participantLeft',
      name: user.id
    };

    for (let otherUser of usersInRoom.values()) {
      if (otherUser.incomingMedia[user.id]) {
        otherUser.incomingMedia[user.id].release();
        delete otherUser.incomingMedia[user.id];
      }

      otherUser.socket.emit('message', data);
    }

    if (Array.from(room.participants.values()).length === 0) {
      if (room.recorderEndpoint) {
        room.recorderEndpoint.stop();
      }
      room.pipeline.release();
      this.rooms.delete(user.roomName);

      const meetingManager = new MeetingManager();
      try {
        await meetingManager.endMeeting(socket.room);
      } catch (err) {
        console.error(err);
      }
    }

    const oldRoom = socket.room;
    socket.room = null;
    callback(null, oldRoom);
  }

  processIceCandidateQueue(iceCandidateQueue, mediaEndpoint) {
    if (iceCandidateQueue) {
      while (iceCandidateQueue.length) {
        const message = iceCandidateQueue.shift();
        mediaEndpoint.addIceCandidate(message.candidate);
      }
    }
  }

  setOnIceCandidateOnEndpoint(mediaEndpoint, socket, userId) {
    mediaEndpoint.on('OnIceCandidate', event => {
      const candidate = kurento.register.complexTypes.IceCandidate(event.candidate);
      socket.emit('message', {
        id: 'iceCandidate',
        name: userId,
        candidate
      });
    });
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

