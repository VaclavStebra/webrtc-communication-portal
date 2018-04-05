import { ADD_PARTICIPANT } from '../constants/ActionTypes';

import { addPeerConnection } from '../actions/videoActions';

import { createPeerConnection } from '../utils/peerConnectionHelpers';

function handleAddParticipant(store, action) {
  const state = store.getState();

  if (state.videoStreams.local) {
    const peerConnection = createPeerConnection(
      action.user.id,
      state.videoStreams.peerConnections,
      state.videoStreams.local,
      state.user.data.id,
      store
    );

    store.dispatch(addPeerConnection({ id: action.user.id, connection: peerConnection }));

    peerConnection.createOffer()
      .then((sessionDescription) => {
        peerConnection.setLocalDescription(sessionDescription);
        store.dispatch(addPeerConnection({ id: action.user.id, connection: peerConnection }));

        window.socket.emit('webrtc.message', {
          from: state.user.data.id,
          to: action.user.id,
          sdp: sessionDescription,
          type: 'sdp-offer'
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

export default store => next => (action) => {
  if (action.type === ADD_PARTICIPANT) {
    handleAddParticipant(store, action);
  }

  return next(action);
};
