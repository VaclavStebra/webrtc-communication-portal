import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class MeetingPage extends React.Component {
  render() {
    return (
      <div className="center">
        {this.props.participants.map(p => (
          <p key={p.id}>{p.email}</p>
          ))}
      </div>
    );
  }
}

MeetingPage.propTypes = {
  participants: PropTypes.array.isRequired // eslint-disable-line react/forbid-prop-types
};

const mapStateToProps = state => ({
  participants: state.meeting.data.participants
});

export default connect(mapStateToProps)(MeetingPage);
