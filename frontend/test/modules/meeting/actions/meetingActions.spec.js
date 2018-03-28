import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import { API_URL } from '../../../../config/config';
import * as actions from '../../../../src/modules/meeting/actions/meetingActions';
import * as types from '../../../../src/modules/meeting/constants/ActionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

function mockFetchMeetings() {
  fetchMock
    .getOnce(
      `${API_URL}/meetings`,
      {
        body: {
          meetings: []
        },
        headers: {
          'content-type': 'application/json'
        }
      }
    );
}

function mockFetchMeetingsFailure() {
  fetchMock
    .getOnce(
      `${API_URL}/meetings`,
      500
    );
}

function mockGetMeetingsWrongCredentials() {
  fetchMock
    .getOnce(
      `${API_URL}/meetings`,
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
    describe('Fetching meetings', () => {
      it('creates an action for fetch start', () => {
        const expectedAction = {
          type: types.MEETINGS_FETCH_START
        };

        expect(actions.meetingsFetchStart()).to.deep.equal(expectedAction);
      });

      it('creates an action for fetch failure', () => {
        const expectedAction = {
          type: types.MEETINGS_FETCH_FAILURE
        };

        expect(actions.meetingsFetchFailure()).to.deep.equal(expectedAction);
      });

      it('creates an action for fetch success', () => {
        const expectedAction = {
          type: types.MEETINGS_FETCH_SUCCESS,
          meetings: []
        };

        expect(actions.meetingsFetchSuccess([])).to.deep.equal(expectedAction);
      });

      it('creates MEETINGS_FETCH_SUCCESS after successful fetch', () => {
        mockFetchMeetings();

        const expectedActions = [
          { type: types.MEETINGS_FETCH_START },
          { type: types.MEETINGS_FETCH_SUCCESS, meetings: [] }
        ];

        const store = mockStore({});

        return store.dispatch(actions.fetchMeetings())
          .then(() => {
            expect(store.getActions()).to.deep.equal(expectedActions);
          });
      });

      it('creates MEETINGS_FETCH_FAILURE after failed fetch', () => {
        mockFetchMeetingsFailure();

        const expectedActions = [
          { type: types.MEETINGS_FETCH_START },
          { type: types.MEETINGS_FETCH_FAILURE }
        ];

        const store = mockStore({});

        return store.dispatch(actions.fetchMeetings())
          .then(() => {
            expect(store.getActions()).to.deep.equal(expectedActions);
          });
      });

      it('creates MEETINGS_FETCH_FAILURE after fetch failed with custom error', () => {
        mockGetMeetingsWrongCredentials();

        const expectedActions = [
          { type: types.MEETINGS_FETCH_START },
          { type: types.MEETINGS_FETCH_FAILURE }
        ];

        const store = mockStore({});

        return store.dispatch(actions.fetchMeetings())
          .then(() => {
            expect(store.getActions()).to.deep.equal(expectedActions);
          });
      });
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
          { type: types.MEETING_CREATE_SUCCESS }
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

    describe('Participants', () => {
      it('creates an action to add participant', () => {
        const expectedAction = {
          type: types.ADD_PARTICIPANT,
          user: { id: '1', email: 'test@test.com' }
        };

        expect(actions.addParticipant({
          id: '1',
          email: 'test@test.com'
        })).to.deep.equal(expectedAction);
      });

      it('creates an action to remove participant', () => {
        const expectedAction = {
          type: types.REMOVE_PARTICIPANT,
          user: { id: '1', email: 'test@test.com' }
        };

        expect(actions.removeParticipant({
          id: '1',
          email: 'test@test.com'
        })).to.deep.equal(expectedAction);
      });
    });
  });
});
