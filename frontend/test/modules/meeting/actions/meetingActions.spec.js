import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { push } from 'react-router-redux';

import { API_URL } from '../../../../config/config';
import * as actions from '../../../../src/modules/meeting/actions/meetingActions';
import * as types from '../../../../src/modules/meeting/constants/ActionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// function mockFetchMeeting() {
//   fetchMock
//     .getOnce(
//       `${API_URL}/meetings/fetch`,
//       {
//         body: {
//           meeting: {}
//         },
//         headers: {
//           'content-type': 'application/json'
//         }
//       }
//     );
// }
//
// function mockFetchMeetingFailure() {
//   fetchMock
//     .getOnce(
//       `${API_URL}/meetings/fetch`,
//       500
//     );
// }
//
// function mockGetMeetingWrongCredentials() {
//   fetchMock
//     .getOnce(
//       `${API_URL}/meetings/fetch`,
//       {
//         body: {
//           error: 'Invalid credentials'
//         },
//         headers: {
//           'content-type': 'application/json'
//         }
//       }
//     );
// }

function mockPostCreateMeeting() {
  fetchMock
    .postOnce(
      `${API_URL}/meetings/create`,
      {
        body: {
          description: 'desc'
        },
        headers: {
          'content-type': 'application/json'
        }
      }
    );
}

function mockPostCreateMeetingFailure() {
  fetchMock
    .postOnce(
      `${API_URL}/meetings/create`,
      {
        body: {
          error: 'Invalid credentials'
        },
        headers: {
          'content-type': 'application/json'
        }
      }
    );
}

function mockPostCreateMeetingsServerFailure() {
  fetchMock
    .postOnce(
      `${API_URL}/meetings/create`,
      500
    );
}

describe('Meeting module', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  describe('Meeting actions', () => {
    describe('Fetching meeting', () => {
      it('creates an action for fetch start', () => {
        const expectedAction = {
          type: types.MEETING_FETCH_START
        };

        expect(actions.meetingFetchStart()).to.deep.equal(expectedAction);
      });

      it('creates an action for fetch failure', () => {
        const expectedAction = {
          type: types.MEETING_FETCH_FAILURE
        };

        expect(actions.meetingFetchFailure()).to.deep.equal(expectedAction);
      });

      it('creates an action for fetch success', () => {
        const expectedAction = {
          type: types.MEETING_FETCH_SUCCESS,
          meeting: {}
        };

        expect(actions.meetingFetchSuccess({})).to.deep.equal(expectedAction);
      });

      // it('creates MEETING_FETCH_SUCCESS after successful fetch', () => {
      //   mockFetchMeeting();
      //
      //   const expectedActions = [
      //     { type: types.MEETING_FETCH_START },
      //     { type: types.MEETING_FETCH_SUCCESS, meeting: {} }
      //   ];
      //
      //   const store = mockStore({});
      //
      //   return store.dispatch(actions.fetchMeeting())
      //     .then(() => {
      //       expect(store.getActions()).to.deep.equal(expectedActions);
      //     });
      // });
      //
      // it('creates MEETINGS_FETCH_FAILURE after failed fetch', () => {
      //   mockFetchMeetingFailure();
      //
      //   const expectedActions = [
      //     { type: types.MEETING_FETCH_START },
      //     { type: types.MEETING_FETCH_FAILURE }
      //   ];
      //
      //   const store = mockStore({});
      //
      //   return store.dispatch(actions.fetchMeeting())
      //     .then(() => {
      //       expect(store.getActions()).to.deep.equal(expectedActions);
      //     });
      // });
      //
      // it('creates MEETING_FETCH_FAILURE after fetch failed with custom error', () => {
      //   mockGetMeetingWrongCredentials();
      //
      //   const expectedActions = [
      //     { type: types.MEETING_FETCH_START },
      //     { type: types.MEETING_FETCH_FAILURE }
      //   ];
      //
      //   const store = mockStore({});
      //
      //   return store.dispatch(actions.fetchMeeting())
      //     .then(() => {
      //       expect(store.getActions()).to.deep.equal(expectedActions);
      //     });
      // });
    });

    describe('Meeting creation', () => {
      it('creates an action for meeting create start', () => {
        const expectedAction = {
          type: types.MEETING_CREATE_START
        };

        expect(actions.meetingCreateStart()).to.deep.equal(expectedAction);
      });

      it('creates an action for meeting create failure', () => {
        const expectedAction = {
          type: types.MEETING_CREATE_FAILURE
        };

        expect(actions.meetingCreateFailure()).to.deep.equal(expectedAction);
      });

      it('creates an action for meeting create success', () => {
        const expectedAction = {
          type: types.MEETING_CREATE_SUCCESS
        };

        expect(actions.meetingCreateSuccess()).to.deep.equal(expectedAction);
      });

      it('creates MEETING_CREATE_SUCCESS after successful fetch', () => {
        mockPostCreateMeeting();

        const expectedActions = [
          { type: types.MEETING_CREATE_START },
          { type: types.MEETING_CREATE_SUCCESS },
          push('/meeting/detail/undefined')
        ];

        const store = mockStore({});

        return store.dispatch(actions.createMeeting({}))
          .then(() => {
            expect(store.getActions()).to.deep.equal(expectedActions);
          });
      });

      it('creates MEETING_CREATE_FAILURE after meeting creation failure', () => {
        mockPostCreateMeetingFailure();

        const expectedActions = [
          { type: types.MEETING_CREATE_START },
          { type: types.MEETING_CREATE_FAILURE }
        ];

        const store = mockStore({});

        return store.dispatch(actions.createMeeting({}))
          .then(() => {
            expect(store.getActions()).to.deep.equal(expectedActions);
          });
      });

      it('creates MEETING_CREATE_FAILURE after meeting creation failure due to server error', () => {
        mockPostCreateMeetingsServerFailure();

        const expectedActions = [
          { type: types.MEETING_CREATE_START },
          { type: types.MEETING_CREATE_FAILURE }
        ];

        const store = mockStore({});

        return store.dispatch(actions.createMeeting({}))
          .then(() => {
            expect(store.getActions()).to.deep.equal(expectedActions);
          });
      });

      it('creates an action for create meeting ui reset', () => {
        const expectedAction = {
          type: types.CREATE_UI_RESET
        };

        expect(actions.createUIReset()).to.deep.equal(expectedAction);
      });
    });
  });
});
