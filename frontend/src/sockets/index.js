import io from 'socket.io-client';

import { addParticipant, removeParticipant } from '../modules/meeting/actions/participantsActions';
import { addChatMessage } from '../modules/meeting/actions/chatMessagesActions';

const setupSocket = (dispatch, token, meetingId) => {
  const socket = io.connect('http://localhost:3001', {
    query: {
      token
    }
  });

  socket.emit('init', meetingId);

  socket.on('peer.connected', (user) => {
    dispatch(addParticipant(user));
    console.log(`${user.email} has joined the conference`);
  });

  socket.on('chat message', (msg) => {
    const { email, text } = msg;
    const timestamp = new Date().getTime();
    dispatch(addChatMessage({ email, text, timestamp }));
  });

  socket.on('peer.disconnected', (user) => {
    dispatch(removeParticipant(user));
    console.log(`${user.email} has left the conference`);
  });

  socket.on('error', (err) => {
    console.error(err);
  });

  return socket;
};

export default setupSocket;
