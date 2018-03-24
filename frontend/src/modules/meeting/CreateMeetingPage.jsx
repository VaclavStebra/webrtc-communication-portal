import React from 'react';
import CreateMeetingForm from './components/CreateMeetingForm';

export class CreateMeetingPage extends React.Component {
  render() {
    return (
      <div className="center">
        <h1>Create meeting</h1>
        <div>
          <CreateMeetingForm />
        </div>
      </div>
    );
  }
}

export default CreateMeetingPage;
