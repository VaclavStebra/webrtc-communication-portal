import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Tab, Tabs } from 'material-ui/Tabs';

import ParticipantsList from './components/ParticipantsList';
import MessageList from './components/MessageList';
import AddMessageForm from './components/AddMessageForm';

import { addChatMessage, sendChatMessage } from './actions/chatMessagesActions';

export class MeetingPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stream: null
    };

    this.addNewMessage = this.addNewMessage.bind(this);
  }

  addNewMessage(text) {
    this.props.onAddMessage(this.props.user, text, new Date().getTime());
  }

  gotStream(s) {
    this.setState({stream: URL.createObjectURL(s)});
  }

  componentDidMount() {
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
      .then(s => {
        this.gotStream(s);
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return (
      <Tabs>
        <Tab label="Video">
          <video id="local-video" autoPlay muted src={this.state.stream} />
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
          <div  className="center">
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
  onAddMessage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user.data.email,
  participants: state.participants,
  messages: state.messages
});

const mapDispatchToProps = dispatch => ({
  onAddMessage: (email, text, timestamp) => {
    dispatch(sendChatMessage({ email, text }));
    dispatch(addChatMessage({ email, text, timestamp }));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MeetingPage);
