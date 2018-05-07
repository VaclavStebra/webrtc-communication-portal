'use strict';

const jwt = require('jsonwebtoken');

const constants = require('./config/constants');

const CallManager = require('./utils/CallManager');
const callManager = new CallManager();

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
      callManager.joinRoom(socket, room, err => {
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
        default: {
          socket.emit({ id: 'error', msg: `Invalid message ${message}`});
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
