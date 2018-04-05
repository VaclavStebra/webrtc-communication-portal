import * as types from '../constants/ActionTypes';

export function localStreamStarted(stream) {
  return {
    type: types.LOCAL_STREAM_STARTED,
    stream
  };
}

export function addPeerConnection(connection) {
  return {
    type: types.ADD_PEER_CONNECTION,
    connection
  };
}

export function addPeer(peer) {
  return {
    type: types.ADD_PEER,
    peer
  };
}

export function addWaitingOffer(message) {
  return {
    type: types.ADD_WAITING_OFFER,
    offer: {
      message,
      handled: false
    }
  };
}
