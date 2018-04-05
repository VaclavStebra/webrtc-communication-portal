import io from 'socket.io-client';

import { addParticipant, removeParticipant } from '../modules/meeting/actions/participantsActions';
import { addChatMessage } from '../modules/meeting/actions/chatMessagesActions';
import { addPeerConnection, addWaitingOffer } from '../modules/meeting/actions/videoActions';

import configureStore from '../stores/configureStore';
import { createPeerConnection } from '../modules/meeting/utils/peerConnectionHelpers';

function handleMessage(message, store) {
  const state = store.getState();

  const peerConnection = createPeerConnection(
    message.from,
    state.videoStreams.peerConnections,
    state.videoStreams.local,
    state.user.data.id,
    store
  );

  switch (message.type) {
    case 'sdp-offer':
      peerConnection.setRemoteDescription(new RTCSessionDescription(message.sdp), () => {
        peerConnection.createAnswer().then((sdp) => {
          peerConnection.setLocalDescription(sdp);
          store.dispatch(addPeerConnection({
            id: message.from,
            connection: peerConnection
          }));
          window.socket.emit('webrtc.message', {
            from: state.user.data.id,
            to: message.from,
            sdp,
            type: 'sdp-answer'
          });
        });
      }, (e) => { console.log(e); });
      store.dispatch(addPeerConnection({ id: message.from, connection: peerConnection }));
      break;
    case 'sdp-answer':
      peerConnection.setRemoteDescription(new RTCSessionDescription(message.sdp), () => {}, (e) => {
        console.error(e);
      });
      store.dispatch(addPeerConnection({ id: message.from, connection: peerConnection }));
      break;
    case 'ice':
      if (message.ice) {
        peerConnection.addIceCandidate(message.ice)
          .catch((err) => {
            console.error(err);
          });
        store.dispatch(addPeerConnection({ id: message.from, connection: peerConnection }));
      }
      break;
    default:
      break;
  }
}

const setupSocket = (dispatch, token, meetingId) => {
  const store = configureStore();

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

  socket.on('webrtc.message', (message) => {
    const state = store.getState();

    if (state.videoStreams.local) {
      handleMessage(message, store);
    } else {
      dispatch(addWaitingOffer(message));
    }
  });

  socket.on('error', (err) => {
    console.error(err);
  });

  return socket;
};

export default setupSocket;
