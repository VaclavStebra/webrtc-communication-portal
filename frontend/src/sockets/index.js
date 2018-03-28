

import io from 'socket.io-client';

const setupSocket = (dispatch, token, meetingId) => {
  const socket = io.connect('http://localhost:3001', {
    query: {
      token
    }
  });

  socket.emit('init', meetingId);

  socket.on('peer.connected', (user) => {
    console.log(`${user.email} has joined the conference`);
  });
  socket.on('peer.disconnected', (user) => {
    console.log(`${user.email} has left the conference`);
  });
  socket.on('error', (err) => {
    console.error(err);
  });

  return socket;
};

export default setupSocket;
