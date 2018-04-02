import React from 'react';
import PropTypes from 'prop-types';

export default class MessageList extends React.Component {
  render() {
    const messages = this.props.messages.slice().sort((a, b) => b.timestamp - a.timestamp);

    return (
      <div>
        {messages.map(p => (
          <p key={p.timestamp}><strong>{p.email}</strong> {p.text}</p>
        ))}
      </div>
    );
  }
}

MessageList.propTypes = {
  messages: PropTypes.array.isRequired // eslint-disable-line react/forbid-prop-types
};
