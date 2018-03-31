import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Tab, Tabs } from 'material-ui/Tabs';

import ParticipantsList from './components/ParticipantsList';
import MessageList from './components/MessageList';

export class MeetingPage extends React.Component {
  render() {
    return (
      <Tabs>
        <Tab label="Chat">
          <MessageList messages={this.props.messages} />
        </Tab>
        <Tab label="Participants">
          <ParticipantsList participants={this.props.participants} />
        </Tab>
      </Tabs>
    );
  }
}

MeetingPage.propTypes = {
  participants: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types,
  messages: PropTypes.array.isRequired // eslint-disable-line react/forbid-prop-types,
};

const mapStateToProps = state => ({
  participants: state.participants,
  messages: state.messages
});

export default connect(mapStateToProps)(MeetingPage);
