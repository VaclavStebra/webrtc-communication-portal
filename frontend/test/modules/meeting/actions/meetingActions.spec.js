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
  });
});
