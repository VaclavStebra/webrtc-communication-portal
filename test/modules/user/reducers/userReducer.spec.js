import { userReducer } from '../../../../src/modules/user/reducers/userReducer';
import * as types from '../../../../src/modules/user/constants/ActionTypes';

const initialState = {
  data: {},
  uiState: {
    loginInProgress: false,
    loginFailure: false
  }
};

const email = 'john.doe@email.com';

describe('User module', () => {
  describe('reducers', () => {
    it('returns the initial state', () => {
      expect(userReducer(undefined, {})).to.deep.equal(initialState);
    });

    it('handles LOGIN', () => {
      const action = {
        type: types.LOGIN_SUCCESS,
        email
      };

      expect(userReducer(initialState, action)).to.deep.equal({
        data: {
          email
        },
        uiState: {
          loginInProgress: false,
          loginFailure: false
        }
      });
    });

    it('handles LOGIN_FAILURE', () => {
      const action = {
        type: types.LOGIN_FAILURE
      };

      expect(userReducer(initialState, action)).to.deep.equal({
        data: {},
        uiState: {
          loginInProgress: false,
          loginFailure: true
        }
      });
    });

    it('handles LOGIN_START', () => {
      const action = {
        type: types.LOGIN_START
      };

      expect(userReducer(initialState, action)).to.deep.equal({
        data: {},
        uiState: {
          loginInProgress: true,
          loginFailure: false
        }
      });
    });
  });
});
