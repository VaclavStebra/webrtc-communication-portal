import 'cross-fetch/polyfill';
import { push } from 'react-router-redux';

import * as types from '../constants/ActionTypes';

import { get, post } from '../../../utils/fetchHelpers';

export function meetingFetchStart() {
  return {
    type: types.MEETING_FETCH_START
  };
}

export function meetingFetchFailure() {
  return {
    type: types.MEETING_FETCH_FAILURE
  };
}

export function meetingFetchSuccess(meeting) {
  return {
    type: types.MEETING_FETCH_SUCCESS,
    meeting
  };
}

export function meetingCreateStart() {
  return {
    type: types.MEETING_CREATE_START
  };
}

export function meetingCreateFailure() {
  return {
    type: types.MEETING_CREATE_FAILURE
  };
}

export function meetingCreateSuccess() {
  return {
    type: types.MEETING_CREATE_SUCCESS
  };
}

export function createUIReset() {
  return {
    type: types.CREATE_UI_RESET
  };
}

export function fetchMeeting(id) {
  return (dispatch) => {
    dispatch(meetingFetchStart());

    return get('/meetings/fetch', null, { id })
      .then((body) => {
        if (body.error) {
          dispatch(meetingFetchFailure());
        } else {
          dispatch(meetingFetchSuccess(body.meeting));
        }
      })
      .catch(() => dispatch(meetingFetchFailure()));
  };
}

export function createMeeting(meetingParams, token) {
  const {
    title, isPrivate
  } = meetingParams;

  return (dispatch) => {
    dispatch(meetingCreateStart());

    return post('/meetings/create', {
      title, isPrivate
    }, token)
      .then((body) => {
        if (body.error) {
          dispatch(meetingCreateFailure());
        } else {
          dispatch(meetingCreateSuccess());
          dispatch(push(`/meeting/detail/${body.id}`));
        }
      })
      .catch(() => dispatch(meetingCreateFailure()));
  };
}
