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
