import * as types from '../constants/ActionTypes';

const initialState = [];

function handleAddFile(state, action) {
  const data = state.slice();

  data.push(action.file);

  return data;
}

export function uploadedFileReducer(state = initialState, action) {
  switch (action.type) {
    case types.ADD_UPLOADED_FILE:
      return handleAddFile(state, action);
    default:
      return state;
  }
}

export default {
  uploadedFileReducer
};
