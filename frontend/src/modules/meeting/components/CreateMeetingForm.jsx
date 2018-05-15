import React from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';

export default class CreateMeetingForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      startDate: null,
      startTime: null,
      endDate: null,
      endTime: null,
      isPrivate: true
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
    this.handleIsPrivateChange = this.handleIsPrivateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTitleChange(event, title) {
    this.setState({ title });
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

  handleIsPrivateChange(event, isChecked) {
    this.setState({ isPrivate: isChecked });
  }

  handleSubmit() {
    const {
      title, startDate, startTime, endDate, endTime, isPrivate
    } = this.state;

    this.props.onSubmit({
      title,
      startDate,
      startTime,
      endDate,
      endTime,
      isPrivate
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
        <DatePicker
          hintText="Start date"
          floatingLabelText="Start date"
          value={this.state.startDate}
          onChange={this.handleStartDateChange}
        />
        <TimePicker
          hintText="Start time"
          floatingLabelText="Start time"
          value={this.state.startTime}
          onChange={this.handleStartTimeChange}
        />
        <br />
        <DatePicker
          hintText="End date"
          floatingLabelText="End date"
          value={this.state.endDate}
          onChange={this.handleEndDateChange}
        />
        <TimePicker
          hintText="End time"
          floatingLabelText="End time"
          value={this.state.endTime}
          onChange={this.handleEndTimeChange}
        />
        <br />
        <div className="toggle">
          <Toggle
            label="Private"
            defaultToggled
            onToggle={this.handleIsPrivateChange}
          />
        </div>
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
