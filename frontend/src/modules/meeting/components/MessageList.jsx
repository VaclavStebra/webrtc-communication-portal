import React from 'react';
import PropTypes from 'prop-types';

export default class MessageList extends React.Component {
  render() {
    return (
      <div className="center">
        {this.props.messages.map((p, index) => (
          <p key={index.toString()}><strong>{p.email}</strong> {p.text}</p>
        ))}
      </div>
    );
  }
}

MessageList.propTypes = {
  messages: PropTypes.array.isRequired // eslint-disable-line react/forbid-prop-types
};
