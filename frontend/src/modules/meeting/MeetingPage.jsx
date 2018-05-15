import 'webrtc-adapter';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Tab, Tabs } from 'material-ui/Tabs';
import RaisedButton from 'material-ui/RaisedButton';

import ParticipantsList from './components/ParticipantsList';
import MessageList from './components/MessageList';
import AddMessageForm from './components/AddMessageForm';

import { addChatMessage, sendChatMessage } from './actions/chatMessagesActions';
import { toggleAudio, toggleVideo, toggleScreenShare } from './actions/callActions';

export class MeetingPage extends React.Component {
  constructor(props) {
    super(props);

    this.addNewMessage = this.addNewMessage.bind(this);
  }

  addNewMessage(text) {
    this.props.onAddMessage(this.props.user, text, new Date().getTime());
  }

  renderControlButtons() {
    return (
      <div className="top-separator">
        <RaisedButton
          label={this.props.audioEnabled ? 'Mute audio' : 'Enable audio'}
          primary
          onClick={this.props.toggleAudio}
        />
        &nbsp;
        <RaisedButton
          label={this.props.videoEnabled ? 'Disable video' : 'Enable video'}
          primary
          onClick={this.props.toggleVideo}
        />
        &nbsp;
        <RaisedButton
          label={this.props.screenSharingEnabled ? 'Disable screen sharing' : 'Enable screen sharing'}
          primary
          onClick={this.props.toggleScreenSharing}
        />
      </div>
    );
  }

  render() {
    return (
      <Tabs>
        <Tab label="Video">
          {this.renderControlButtons()}
          <div id="remote-streams" className="top-separator" />
        </Tab>
        <Tab label="Chat">
          <div>
            <div>
              <AddMessageForm submit={this.addNewMessage} />
            </div>
            <MessageList messages={this.props.messages} />
          </div>
        </Tab>
        <Tab label="Participants">
          <ParticipantsList participants={this.props.participants} />
        </Tab>
      </Tabs>
    );
  }
}

MeetingPage.propTypes = {
  user: PropTypes.string.isRequired,
  participants: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  messages: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  onAddMessage: PropTypes.func.isRequired,
  audioEnabled: PropTypes.bool,
  videoEnabled: PropTypes.bool,
  screenSharingEnabled: PropTypes.bool,
  toggleAudio: PropTypes.func.isRequired,
  toggleVideo: PropTypes.func.isRequired,
  toggleScreenSharing: PropTypes.func.isRequired
};

MeetingPage.defaultProps = {
  audioEnabled: true,
  videoEnabled: true,
  screenSharingEnabled: false
};

const mapStateToProps = state => ({
  user: state.user.data.email,
  participants: state.participants,
  messages: state.messages,
  audioEnabled: state.callState.audioEnabled,
  videoEnabled: state.callState.videoEnabled,
  screenSharingEnabled: state.callState.screenShareEnabled
});

const mapDispatchToProps = dispatch => ({
  onAddMessage: (email, text, timestamp) => {
    dispatch(sendChatMessage({ email, text }));
    dispatch(addChatMessage({ email, text, timestamp }));
  },
  toggleAudio: () => {
    dispatch(toggleAudio());
  },
  toggleVideo: () => {
    dispatch(toggleVideo());
  },
  toggleScreenSharing: () => {
    dispatch(toggleScreenShare());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MeetingPage);
