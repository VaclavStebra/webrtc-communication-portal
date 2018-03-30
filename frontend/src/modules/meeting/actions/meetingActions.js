import 'cross-fetch/polyfill';

import * as types from '../constants/ActionTypes';

import { get, post } from '../../../utils/fetchHelpers';

export function meetingsFetchStart() {
  return {
    type: types.MEETINGS_FETCH_START
  };
}

export function meetingsFetchFailure() {
  return {
    type: types.MEETINGS_FETCH_FAILURE
  };
}

export function meetingsFetchSuccess(meetings) {
  return {
    type: types.MEETINGS_FETCH_SUCCESS,
    meetings
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

export function fetchMeetings() {
  return (dispatch) => {
    dispatch(meetingsFetchStart());

    return get('/meetings')
      .then((body) => {
        if (body.error) {
          dispatch(meetingsFetchFailure());
        } else {
          dispatch(meetingsFetchSuccess(body.meetings));
        }
      })
      .catch(() => dispatch(meetingsFetchFailure()));
  };
}

export function createMeeting(meetingParams, token) {
  const {
    title, startDate, endDate, participants
  } = meetingParams;

  return (dispatch) => {
    dispatch(meetingCreateStart());

    return post('/meetings/create', {
      title, startDate, endDate, participants
    }, token)
      .then((body) => {
        if (body.error) {
          dispatch(meetingCreateFailure());
        } else {
          dispatch(meetingCreateSuccess());
        }
      })
      .catch(() => dispatch(meetingCreateFailure()));
  };
}
