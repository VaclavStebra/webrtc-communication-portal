'use strict';

const jwt = require('jsonwebtoken');
const uuid = require('uuid');

const constants = require('./config/constants');

const MeetingManager = require('./modules/meeting/MeetingManager');
const CallManager = require('./utils/CallManager');
const callManager = new CallManager();

module.exports = function (server) {
  const io = require('socket.io')(server);

  io.use(async (socket, next) => {
    if (!socket.handshake.query) {
      return next(new Error('Auth error'));
    }

    const meetingManager = new MeetingManager();
    const meeting = await meetingManager.getMeeting(socket.handshake.query.meetingId);

    if (!meeting) {
      return next(new Error('Invalid meeting'));
    }

    if (meeting.private) {
      jwt.verify(socket.handshake.query.token, constants.JWT_SECRET, (err, decoded) => {
        if (err) {
          return next(new Error('Auth error'));
        }
        console.log(decoded);
        socket.user = decoded;
        next();
      });
    } else {
      if (socket.handshake.query.token) {
        jwt.verify(socket.handshake.query.token, constants.JWT_SECRET, (err, decoded) => {
          if (err) {
            return next(new Error('Auth error'));
          }
          socket.user = decoded;
          next();
        });
      } else {
        const id = uuid.v4();
        socket.user = {
          id,
          email: `anonymous-${id}`
        };
        next();
      }
    }
  });

  io.on('connection', socket => {
    socket.on('init', room => {
      if (socket.user.email.startsWith('anonymous-')) {
        socket.emit('setUserId', socket.user.id);
      }
      callManager.joinRoom(socket, room, err => {
        if (err) {
          console.error(`join Room error ${err}`);
        }
      });
    });

    socket.on('chat message', message => {
      console.log('got message: ' + JSON.stringify(message));
      console.log('sending message to room: ' + socket.room);
      socket.to(socket.room).emit('chat message', message);
    });

    socket.on('message', message => {
      switch (message.id) {
        case 'receiveVideoFrom': {
          callManager.receiveVideoFrom(socket, message.sender, message.sdpOffer, (error) => {
            if (error) {
              console.error(error);
            }
          });
          break;
        }
        case 'onIceCandidate': {
          callManager.addIceCandidate(socket, message, (error) => {
            if (error) {
              console.error(error);
            }
          });
          break;
        }
        case 'changeSource': {
          callManager.leaveRoom(socket, (error, oldRoom) => {
            if (error) {
              console.error(error);
            }

            callManager.joinRoom(socket, oldRoom, err => {
              if (err) {
                console.error(`join Room error ${err}`);
              }
            });
          });
          break;
        }
        default: {
          socket.emit({ id: 'error', msg: `Invalid message ${message}` });
        }
      }
    });

    socket.on('disconnect', () => {
      callManager.leaveRoom(socket, error => {
        if (error) {
          console.error(error);
        }
      });
    });
  });
};
