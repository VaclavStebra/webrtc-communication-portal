import { meetingReducer } from '../../../../src/modules/meeting/reducers/meetingReducer';
import * as types from '../../../../src/modules/meeting/constants/ActionTypes';

const initialDataState = {
  meetings: []
};

const initialUiState = {
  fetchInProgress: false,
  fetchFailure: false,
  createInProgress: false,
  createFailure: false
};

const initialState = {
  data: initialDataState,
  uiState: initialUiState
};

const fetchInProgressState = {
  data: initialDataState,
  uiState: {
    fetchInProgress: true,
    fetchFailure: false,
    createInProgress: false,
    createFailure: false
  }
};

describe('Meeting module', () => {
  describe('reducers', () => {
    describe('meeting reducer', () => {
      it('returns the initial state', () => {
        expect(meetingReducer(undefined, {})).to.deep.equal(initialState);
      });

      it('handles MEETINGS_FETCH_START', () => {
        const action = {
          type: types.MEETINGS_FETCH_START
        };

        expect(meetingReducer(initialState, action)).to.deep.equal({
          data: initialDataState,
          uiState: {
            fetchInProgress: true,
            fetchFailure: false,
            createInProgress: false,
            createFailure: false
          }
        });
      });

      it('handles MEETINGS_FETCH_FAILURE', () => {
        const action = {
          type: types.MEETINGS_FETCH_FAILURE
        };

        expect(meetingReducer(initialState, action)).to.deep.equal({
          data: initialDataState,
          uiState: {
            fetchInProgress: false,
            fetchFailure: true,
            createInProgress: false,
            createFailure: false
          }
        });
      });

      it('handles MEETINGS_FETCH_SUCCESS', () => {
        const action = {
          type: types.MEETINGS_FETCH_SUCCESS,
          meetings: [{
            id: 1,
            desc: 'meeting'
          }]
        };

        expect(meetingReducer(fetchInProgressState, action)).to.deep.equal({
          data: {
            meetings: [{
              id: 1,
              desc: 'meeting'
            }]
          },
          uiState: initialUiState
        });
      });

      it('handles MEETING_CREATE_START', () => {
        const action = {
          type: types.MEETING_CREATE_START
        };

        expect(meetingReducer(initialState, action)).to.deep.equal({
          data: initialDataState,
          uiState: {
            fetchInProgress: false,
            fetchFailure: false,
            createInProgress: true,
            createFailure: false
          }
        });
      });

      it('handles MEETING_CREATE_FAILURE', () => {
        const action = {
          type: types.MEETING_CREATE_FAILURE
        };

        expect(meetingReducer(initialState, action)).to.deep.equal({
          data: initialDataState,
          uiState: {
            fetchInProgress: false,
            fetchFailure: false,
            createInProgress: false,
            createFailure: true
          }
        });
      });

      it('handles MEETING_CREATE_SUCCESS', () => {
        const action = {
          type: types.MEETING_CREATE_SUCCESS
        };

        expect(meetingReducer(initialState, action)).to.deep.equal({
          data: initialDataState,
          uiState: initialUiState
        });
      });

      it('handles CREATE_UI_RESET', () => {
        const action = {
          type: types.CREATE_UI_RESET
        };

        const state = { ...initialState };
        state.uiState = {
          fetchInProgress: false,
          fetchFailure: false,
          createInProgress: false,
          createFailure: true
        };

        expect(meetingReducer(state, action)).to.deep.equal(initialState);
      });
    });
  });
});
