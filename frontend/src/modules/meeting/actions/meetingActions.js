import 'cross-fetch/polyfill';

import { API_URL } from '../../../../config/config';
import * as types from '../constants/ActionTypes';

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

export function fetchMeetings() {
  return (dispatch) => {
    dispatch(meetingsFetchStart());

    return fetch(`${API_URL}/meetings`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then(res => res.json())
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

export function createMeeting(meetingParams) {
  const {
    title, startDate, endDate, participants
  } = meetingParams;

  return (dispatch) => {
    dispatch(meetingCreateStart());

    return fetch(`${API_URL}/meetings/create`, {
      method: 'POST',
      body: JSON.stringify({
        title, startDate, endDate, participants
      }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then(res => res.json())
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
