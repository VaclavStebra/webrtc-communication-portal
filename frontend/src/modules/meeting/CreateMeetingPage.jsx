import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CircularProgress from 'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';

import { createMeeting } from './actions/meetingActions';

import CreateMeetingForm from './components/CreateMeetingForm';

export class CreateMeetingPage extends React.Component {
  renderCircularProgress() {
    if (!this.props.actionInProgress) {
      return '';
    }

    return (
      <div className="top-separator">
        <CircularProgress />
      </div>
    );
  }

  render() {
    return (
      <div className="center">
        <h1>Create meeting</h1>
        <div>
          <CreateMeetingForm
            token={this.props.token}
            actionInProgress={this.props.actionInProgress}
            onSubmit={this.props.onCreate}
          />
          {this.renderCircularProgress()}
        </div>
        <Snackbar
          message="Something went wrong"
          open={this.props.actionFailure}
        />
      </div>
    );
  }
}

CreateMeetingPage.propTypes = {
  actionInProgress: PropTypes.bool,
  actionFailure: PropTypes.bool,
  onCreate: PropTypes.func.isRequired,
  token: PropTypes.string
};

CreateMeetingPage.defaultProps = {
  actionInProgress: false,
  actionFailure: false,
  token: ''
};

const mapStateToProps = state => ({
  actionInProgress: state.meeting.uiState.createInProgress,
  actionFailure: state.meeting.uiState.createFailure,
  token: state.user.data ? state.user.data.token : ''
});

const mapDispatchToProps = dispatch => ({
  onCreate: (meetingParams, token) => {
    dispatch(createMeeting(meetingParams, token));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateMeetingPage);
