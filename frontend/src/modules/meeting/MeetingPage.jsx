import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Tab, Tabs } from 'material-ui/Tabs';

import ParticipantsList from './components/ParticipantsList';
import MessageList from './components/MessageList';
import AddMessageForm from './components/AddMessageForm';

import { addChatMessage, sendChatMessage } from './actions/chatMessagesActions';
import { localStreamStarted } from './actions/videoActions';
import VideoStream from './components/VideoStream';

export class MeetingPage extends React.Component {
  constructor(props) {
    super(props);

    this.addNewMessage = this.addNewMessage.bind(this);
  }

  componentDidMount() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then((stream) => {
        this.props.onLocalStreamObtained(stream);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  addNewMessage(text) {
    this.props.onAddMessage(this.props.user, text, new Date().getTime());
  }

  render() {
    return (
      <Tabs>
        <Tab label="Video">
          <VideoStream
            id="local-video"
            autoPlay
            muted
            stream={this.props.localStream}
          />
        </Tab>
        <Tab label="Chat">
          <div className="center">
            <div>
              <AddMessageForm submit={this.addNewMessage} />
            </div>
            <MessageList messages={this.props.messages} />
          </div>
        </Tab>
        <Tab label="Participants">
          <div className="center">
            <ParticipantsList participants={this.props.participants} />
          </div>
        </Tab>
      </Tabs>
    );
  }
}

MeetingPage.propTypes = {
  user: PropTypes.string.isRequired,
  participants: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  messages: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  localStream: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  onAddMessage: PropTypes.func.isRequired,
  onLocalStreamObtained: PropTypes.func.isRequired
};

MeetingPage.defaultProps = {
  localStream: null
};

const mapStateToProps = state => ({
  user: state.user.data.email,
  participants: state.participants,
  messages: state.messages,
  localStream: state.videoStreams.local
});

const mapDispatchToProps = dispatch => ({
  onAddMessage: (email, text, timestamp) => {
    dispatch(sendChatMessage({ email, text }));
    dispatch(addChatMessage({ email, text, timestamp }));
  },

  onLocalStreamObtained: (stream) => {
    dispatch(localStreamStarted(stream));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MeetingPage);
