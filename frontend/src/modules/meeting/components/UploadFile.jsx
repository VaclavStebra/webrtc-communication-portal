import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { uploadFile } from '../actions/chatMessagesActions';

class AddMessageForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleFileUpload = this.handleFileUpload.bind(this);
  }


  handleFileUpload(event) {
    this.props.uploadFile(this.props.meetingId, event.target.files[0], this.props.token);
  }

  render() {
    return (
      <div className="center">
        <input type="file" onChange={this.handleFileUpload} />
      </div>
    );
  }
}

AddMessageForm.propTypes = {
  meetingId: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  uploadFile: PropTypes.func.isRequired
};


const mapStateToProps = state => ({
  token: state.user.data ? state.user.data.token : ''
});

const mapDispatchToProps = dispatch => ({
  uploadFile: (meetingId, file, token) => {
    dispatch(uploadFile(meetingId, file, token));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddMessageForm);
