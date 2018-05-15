import React from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';

export default class CreateMeetingForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      isPrivate: true,
      participants: ''
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleIsPrivateChange = this.handleIsPrivateChange.bind(this);
    this.handleParticipantsChange = this.handleParticipantsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTitleChange(event, title) {
    this.setState({ title });
  }

  handleParticipantsChange(event, participants) {
    this.setState({ participants });
  }

  handleIsPrivateChange(event, isChecked) {
    this.setState({ isPrivate: isChecked });
  }

  handleSubmit() {
    const {
      title, isPrivate, participants
    } = this.state;

    this.props.onSubmit({
      title,
      isPrivate,
      participants: isPrivate ? participants : ''
    }, this.props.token);
  }

  render() {
    return (
      <div>
        <TextField
          hintText="Title of the meeting"
          floatingLabelText="Title"
          value={this.state.title}
          onChange={this.handleTitleChange}
        />
        <br />
        <div className="toggle">
          <Toggle
            label="Private"
            defaultToggled
            onToggle={this.handleIsPrivateChange}
          />
        </div>
        <br />
        <TextField
          hintText="Participants of the meeting"
          floatingLabelText="Participants"
          disabled={!this.state.isPrivate}
          value={this.state.participants}
          onChange={this.handleParticipantsChange}
        />
        <div className="top-separator">
          <RaisedButton
            label="Plan new meeting"
            primary
            disabled={this.props.actionInProgress}
            onClick={this.handleSubmit}
          />
        </div>
      </div>
    );
  }
}

CreateMeetingForm.propTypes = {
  actionInProgress: PropTypes.bool,
  token: PropTypes.string,
  onSubmit: PropTypes.func.isRequired
};

CreateMeetingForm.defaultProps = {
  actionInProgress: false,
  token: ''
};
