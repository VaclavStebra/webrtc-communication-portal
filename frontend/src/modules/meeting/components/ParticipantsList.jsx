import React from 'react';
import PropTypes from 'prop-types';

export default class ParticipantsList extends React.Component {
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

ParticipantsList.propTypes = {
  participants: PropTypes.array.isRequired // eslint-disable-line react/forbid-prop-types
};
