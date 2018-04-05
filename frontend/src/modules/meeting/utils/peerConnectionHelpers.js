import { addPeer } from '../actions/videoActions';

const rtcPeerConnectionConfig = { iceServers: [{ url: 'stun:stun.l.google.com:19302' }] };

export function createPeerConnection(id, peerConnections, localStream, user, store) {
  if (peerConnections[id]) {
    return peerConnections[id];
  }

  const peerConnection = new RTCPeerConnection(rtcPeerConnectionConfig);
  peerConnection.addStream(localStream);
  peerConnection.onicecandidate = function (candidate) {
    window.socket.emit('webrtc.message', {
      from: user.id,
      to: id,
      ice: candidate.candidate,
      type: 'ice'
    });
  };
  peerConnection.onaddstream = function (stream) {
    store.dispatch(addPeer({ id, stream }));
  };

  return peerConnection;
}

export default {
  createPeerConnection
};
