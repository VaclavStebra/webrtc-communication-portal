import React from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import RaisedButton from 'material-ui/RaisedButton';

export default class CreateMeetingForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      startDate: null,
      startTime: null,
      endDate: null,
      endTime: null,
      participants: ''
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleParticipantsChange = this.handleParticipantsChange.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTitleChange(event, title) {
    this.setState({ title });
  }

  handleParticipantsChange(event, participants) {
    this.setState({ participants });
  }

  handleStartDateChange(event, startDate) {
    this.setState({ startDate });
  }

  handleEndDateChange(event, endDate) {
    this.setState({ endDate });
  }

  handleStartTimeChange(event, startTime) {
    this.setState({ startTime });
  }

  handleEndTimeChange(event, endTime) {
    this.setState({ endTime });
  }

  handleSubmit() {
    const {
      title, startDate, startTime, endDate, endTime, participants
    } = this.state;

    this.props.onSubmit({
      title,
      startDate,
      startTime,
      endDate,
      endTime,
      participants
    });
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
        <DatePicker
          hintText="Start date"
          value={this.state.startDate}
          onChange={this.handleStartDateChange}
        />
        <TimePicker
          hintText="Start time"
          value={this.state.startTime}
          onChange={this.handleStartTimeChange}
        />
        <br />
        <DatePicker
          hintText="End date"
          value={this.state.endDate}
          onChange={this.handleEndDateChange}
        />
        <TimePicker
          hintText="End time"
          value={this.state.endTime}
          onChange={this.handleEndTimeChange}
        />
        <br />
        <TextField
          hintText="Participants of the meeting"
          floatingLabelText="Participants"
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
  onSubmit: PropTypes.func.isRequired
};

CreateMeetingForm.defaultProps = {
  actionInProgress: false
};
