import React from 'react';
import PropTypes from 'prop-types';
import { MEETING_FILES_BASE } from '../../../constants/links';

export default class MessageList extends React.Component {
  render() {
    const files = this.props.files.slice().sort((a, b) => b.timestamp - a.timestamp);

    return (
      <div className="center">
        {files.map(file => (
          <p key={file.timestamp}>
            <a href={`${MEETING_FILES_BASE}${file.name}&meetingId=${this.props.meetingId}`}>
              {file.name}
            </a>
          </p>
        ))}
      </div>
    );
  }
}

MessageList.propTypes = {
  meetingId: PropTypes.string.isRequired,
  files: PropTypes.array.isRequired // eslint-disable-line react/forbid-prop-types
};
