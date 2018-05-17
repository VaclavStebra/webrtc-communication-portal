import * as types from '../constants/ActionTypes';
import { postFile } from '../../../utils/fetchHelpers';

export function addChatMessage(message) {
  return {
    type: types.ADD_CHAT_MESSAGE,
    message
  };
}

export function sendChatMessage(message) {
  return {
    type: types.SEND_CHAT_MESSAGE,
    message
  };
}

export function fileUploaded(name) {
  return {
    type: types.FILE_UPLOADED,
    name
  };
}

export function addFileUploaded(file) {
  return {
    type: types.ADD_UPLOADED_FILE,
    file
  };
}

export function uploadFile(meetingId, file, token) {
  return (dispatch) => {
    const data = new FormData();
    data.append('file', file);
    data.append('id', meetingId);

    return postFile('/meetings/uploadFile', data, token)
      .then((body) => {
        if (body.error) {
          console.error(body.error);
        } else {
          const timestamp = new Date().getTime();
          dispatch(fileUploaded(file.name));
          dispatch(addFileUploaded({ timestamp, name: file.name }));
        }
      })
      .catch(err => console.error(err));
  };
}
