import * as types from '../constants/ActionTypes';

const initialState = {
  local: null,
  others: [],
  peers: [],
  peerConnections: {},
  waitingPeers: [],
  waitingOffers: []
};

function copyState(state) {
  const { local, peerConnections } = state;
  const others = state.others.slice();
  const peers = state.peers.slice();
  const waitingPeers = state.waitingPeers.slice();
  const waitingOffers = state.waitingOffers.slice();

  return {
    local,
    others,
    peers,
    peerConnections,
    waitingPeers,
    waitingOffers
  };
}

function handleLocalStreamStarted(state, action) {
  const newState = copyState(state);

  newState.local = action.stream;

  return newState;
}

function handleAddParticipant(state, action) {
  const newState = copyState(state);

  if (!state.local) {
    newState.waitingPeers.push({ id: action.user.id, handled: false });
  }

  return newState;
}

function handleAddPeerConnection(state, action) {
  const newState = copyState(state);

  newState.peerConnections[action.connection.id] = action.connection.connection;

  return newState;
}

function handleAddPeer(state, action) {
  const newState = copyState(state);

  newState.peers.push(action.peer);

  return newState;
}

function handleAddWaitingOffer(state, action) {
  const newState = copyState(state);

  newState.waitingOffers.push(action.offer);

  return newState;
}

export function videoReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOCAL_STREAM_STARTED:
      return handleLocalStreamStarted(state, action);
    case types.ADD_PARTICIPANT:
      return handleAddParticipant(state, action);
    case types.ADD_PEER_CONNECTION:
      return handleAddPeerConnection(state, action);
    case types.ADD_PEER:
      return handleAddPeer(state, action);
    case types.ADD_WAITING_OFFER:
      return handleAddWaitingOffer(state, action);
    default:
      return state;
  }
}

export default {
  videoReducer
};
