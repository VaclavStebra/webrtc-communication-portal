import React from 'react';

import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import RaisedButton from 'material-ui/RaisedButton';

export default class CreateMeetingForm extends React.Component {
  render() {
    return (
      <div>
        <TextField
          hintText="Title of the meeting"
          floatingLabelText="Title"
        />
        <br />
        <DatePicker
          hintText="Start date"
        />
        <TimePicker
          hintText="Start time"
        />
        <br />
        <DatePicker
          hintText="End date"
        />
        <TimePicker
          hintText="End time"
        />
        <br />
        <TextField
          hintText="Participants of the meeting"
          floatingLabelText="Participants"
        />
        <div className="top-separator">
          <RaisedButton
            label="Plan new meeting"
            primary
          />
        </div>
      </div>
    );
  }
}
