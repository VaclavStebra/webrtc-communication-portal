import 'webrtc-adapter';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { Tab, Tabs } from 'material-ui/Tabs';
import RaisedButton from 'material-ui/RaisedButton';

import ParticipantsList from './components/ParticipantsList';
import MessageList from './components/MessageList';
import AddMessageForm from './components/AddMessageForm';

import { addChatMessage, sendChatMessage } from './actions/chatMessagesActions';
import { toggleAudio, toggleVideo, toggleScreenShare } from './actions/callActions';
import { fetchMeeting } from './actions/meetingActions';

export class MeetingPage extends React.Component {
  constructor(props) {
    super(props);

    this.addNewMessage = this.addNewMessage.bind(this);
  }

  componentDidMount() {
    this.props.fetchMeeting(this.props.meetingId);
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

  renderMessages() {
    if (this.props.meeting.messages.length === 0) {
      return (
        <div>
          <h2>No messages</h2>
        </div>
      );
    }
    return (
      <div>
        <MessageList messages={this.props.meeting.messages} />
      </div>
    );
  }

  renderMeetingOverview() {
    return (
      <div>
        <h2>Meeting already ended</h2>
        {this.renderMessages()}
      </div>
    );
  }

  render() {
    if (this.props.meeting) {
      if (this.props.meeting.isPrivate && !this.props.user) {
        return <Redirect to="/login" />;
      }

      if (this.props.meeting.ended) {
        return this.renderMeetingOverview();
      }

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
    return (
      <div>
        <h2>Invalid meeting</h2>
      </div>
    );
  }
}

MeetingPage.propTypes = {
  meetingId: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  participants: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  messages: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  onAddMessage: PropTypes.func.isRequired,
  audioEnabled: PropTypes.bool,
  videoEnabled: PropTypes.bool,
  screenSharingEnabled: PropTypes.bool,
  toggleAudio: PropTypes.func.isRequired,
  toggleVideo: PropTypes.func.isRequired,
  toggleScreenSharing: PropTypes.func.isRequired,
  meeting: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  fetchMeeting: PropTypes.func.isRequired
};

MeetingPage.defaultProps = {
  audioEnabled: true,
  videoEnabled: true,
  screenSharingEnabled: false,
  meeting: null
};

const mapStateToProps = state => ({
  user: state.user.data ? state.user.data.email : 'anonymous',
  participants: state.participants,
  messages: state.messages,
  audioEnabled: state.callState.audioEnabled,
  videoEnabled: state.callState.videoEnabled,
  screenSharingEnabled: state.callState.screenShareEnabled,
  meeting: state.meeting.data.meeting
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
  },
  fetchMeeting: (id) => {
    dispatch(fetchMeeting(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MeetingPage);
