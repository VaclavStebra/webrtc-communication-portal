import React from 'react';
import PropTypes from 'prop-types';

export default class VideoStream extends React.Component {
  constructor(props) {
    super(props);

    this.video = null;

    this.setVideoRef = this.setVideoRef.bind(this);
  }

  setVideoRef(element) {
    this.video = element;
  }

  render() {
    if (this.props.stream && this.video) {
      this.video.srcObject = this.props.stream;
    }

    return (
      <video
        id={this.props.id}
        autoPlay={this.props.autoPlay}
        muted={this.props.muted}
        ref={this.setVideoRef}
      />
    );
  }
}

VideoStream.propTypes = {
  id: PropTypes.string.isRequired,
  autoPlay: PropTypes.bool.isRequired,
  muted: PropTypes.bool.isRequired,
  stream: PropTypes.object // eslint-disable-line react/forbid-prop-types
};

VideoStream.defaultProps = {
  stream: null
};
