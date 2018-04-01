'use strict';

const jwt = require('jsonwebtoken');

const constants = require('./config/constants');

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

  let rooms = {};

  io.on('connection', function (socket) {
    socket.on('init', function (room) {
      socket.room = room;
      socket.join(room);
      if (room in rooms) {
        for (let otherSocket of rooms[room]) {
          socket.emit('peer.connected', otherSocket.user);
        }
        rooms[room].push(socket);
        socket.to(room).emit('peer.connected', socket.user);
        console.log(socket.user.email, 'has joined room', room);
      } else {
        rooms[room] = [socket];
        console.log(socket.user.email, 'has created room', room);
      }
    });

    socket.on('chat message', function (msg) {
      console.log('got message: ' + JSON.stringify(msg));
      console.log('sending message to room: '+ socket.room);
      socket.to(socket.room).emit('chat message', msg);
    });

    socket.on('disconnect', function () {
      if ( ! socket.room) {
        return;
      }
      socket.leave(socket.room);
      socket.to(socket.room).emit('peer.disconnected', socket.user);
      console.log(socket.user.email, 'has left room', socket.room);

      const indexOfSocket = rooms[socket.room].indexOf(socket);
      if (indexOfSocket > -1) {
        rooms[socket.room].splice(indexOfSocket, 1);
      }

      if (rooms[socket.room].length === 0) {
        delete rooms[socket.room];
      }

      socket.room = null;
    });
  });
};