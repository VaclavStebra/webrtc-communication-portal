import { userReducer } from '../../../../src/modules/user/reducers/userReducer';
import * as types from '../../../../src/modules/user/constants/ActionTypes';

const email = 'john.doe@email.com';

const usefulUiStates = {
  noProgressNoFail: {
    loginInProgress: false,
    loginFailure: false,
    signUpFailure: false,
    signUpInProgress: false
  },
  loginFailure: {
    loginInProgress: false,
    loginFailure: true,
    signUpFailure: false,
    signUpInProgress: false
  },
  loginInProgress: {
    loginInProgress: true,
    loginFailure: false,
    signUpFailure: false,
    signUpInProgress: false
  },
  signUpFailure: {
    loginInProgress: false,
    loginFailure: false,
    signUpFailure: true,
    signUpInProgress: false
  },
  signUpInProgress: {
    loginInProgress: false,
    loginFailure: false,
    signUpFailure: false,
    signUpInProgress: true
  }
};

const initialState = {
  data: null,
  uiState: usefulUiStates.noProgressNoFail
};

const loggedInState = {
  data: email,
  uiState: usefulUiStates.noProgressNoFail
};

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
        uiState: usefulUiStates.noProgressNoFail
      });
    });

    it('handles LOGIN_FAILURE', () => {
      const action = {
        type: types.LOGIN_FAILURE
      };

      expect(userReducer(initialState, action)).to.deep.equal({
        data: null,
        uiState: usefulUiStates.loginFailure
      });
    });

    it('handles LOGIN_START', () => {
      const action = {
        type: types.LOGIN_START
      };

      expect(userReducer(initialState, action)).to.deep.equal({
        data: null,
        uiState: usefulUiStates.loginInProgress
      });
    });

    it('handles LOGOUT', () => {
      const action = {
        type: types.LOGOUT
      };

      expect(userReducer(loggedInState, action)).to.deep.equal({
        data: null,
        uiState: usefulUiStates.noProgressNoFail
      });
    });

    it('handles SIGNUP_FAILURE', () => {
      const action = {
        type: types.SIGNUP_FAILURE
      };

      expect(userReducer(initialState, action)).to.deep.equal({
        data: null,
        uiState: usefulUiStates.signUpFailure
      });
    });

    it('handles SIGNUP_START', () => {
      const action = {
        type: types.SIGNUP_START
      };

      expect(userReducer(initialState, action)).to.deep.equal({
        data: null,
        uiState: usefulUiStates.signUpInProgress
      });
    });
  });
});
