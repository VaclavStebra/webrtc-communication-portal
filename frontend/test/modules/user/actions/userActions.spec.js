import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import { API_URL } from '../../../../config/config';
import * as actions from '../../../../src/modules/user/actions/userActions';
import * as types from '../../../../src/modules/user/constants/ActionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

function mockPostToken() {
  fetchMock
    .postOnce(
      `${API_URL}/users/token`,
      {
        body: {
          token: 'token'
        },
        headers: {
          'content-type': 'application/json'
        }
      }
    );
}

function mockPostTokenWrongCredentials() {
  fetchMock
    .postOnce(
      `${API_URL}/users/token`,
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

function mockPostTokenFailure() {
  fetchMock
    .postOnce(
      `${API_URL}/users/token`,
      500
    );
}

function mockSignup() {
  fetchMock
    .postOnce(
      `${API_URL}/users/signup`,
      {
        body: {
          token: 'token'
        },
        headers: {
          'content-type': 'application/json'
        }
      }
    );
}

function mockSignupApiError() {
  fetchMock
    .postOnce(
      `${API_URL}/users/signup`,
      {
        body: {
          error: 'Internal server error'
        },
        headers: {
          'content-type': 'application/json'
        }
      }
    );
}


function mockSignupFailure() {
  fetchMock
    .postOnce(
      `${API_URL}/users/signup`,
      500
    );
}

describe('User module', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  describe('User actions', () => {
    it('creates an action to login user', () => {
      const token = 'token';
      const expectedAction = {
        type: types.LOGIN_SUCCESS,
        token
      };

      expect(actions.loginSuccess(token)).to.deep.equal(expectedAction);
    });

    it('creates an action for login failure', () => {
      const expectedAction = {
        type: types.LOGIN_FAILURE
      };

      expect(actions.loginFailure()).to.deep.equal(expectedAction);
    });

    it('creates an action for login start', () => {
      const expectedAction = {
        type: types.LOGIN_START
      };

      expect(actions.loginStart()).to.deep.equal(expectedAction);
    });

    it('creates an action for logout', () => {
      const expectedAction = {
        type: types.LOGOUT
      };

      expect(actions.logout()).to.deep.equal(expectedAction);
    });

    it('creates LOGIN after successful login', () => {
      const email = 'john.doe@email.com';
      const password = 'password';

      mockPostToken();

      const expectedActions = [
        { type: types.LOGIN_START },
        { type: types.LOGIN_SUCCESS, token: 'token' }
      ];

      const store = mockStore({});

      return store.dispatch(actions.login(email, password))
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions);
        });
    });

    it('creates LOGIN_FAILURE after unsuccessful login', () => {
      const email = 'john.doe@email.com';
      const password = 'wrongpassword';

      mockPostTokenWrongCredentials();

      const expectedActions = [
        { type: types.LOGIN_START },
        { type: types.LOGIN_FAILURE }
      ];

      const store = mockStore({});

      return store.dispatch(actions.login(email, password))
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions);
        });
    });

    it('creates LOGIN_FAILURE after failed login', () => {
      const email = 'john.doe@email.com';
      const password = 'wrongpassword';

      mockPostTokenFailure();

      const expectedActions = [
        { type: types.LOGIN_START },
        { type: types.LOGIN_FAILURE }
      ];

      const store = mockStore({});

      return store.dispatch(actions.login(email, password))
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions);
        });
    });

    it('creates an action for signup failure', () => {
      const expectedAction = {
        type: types.SIGNUP_FAILURE
      };

      expect(actions.signupFailure()).to.deep.equal(expectedAction);
    });

    it('creates an action for signup start', () => {
      const expectedAction = {
        type: types.SIGNUP_START
      };

      expect(actions.signupStart()).to.deep.equal(expectedAction);
    });

    it('creates LOGIN after successful signup', () => {
      const email = 'john.doe@email.com';
      const password = 'password';

      mockSignup();

      const expectedActions = [
        { type: types.SIGNUP_START },
        { type: types.LOGIN_SUCCESS, token: 'token' }
      ];

      const store = mockStore({});

      return store.dispatch(actions.signup(email, password))
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions);
        });
    });

    it('creates SIGNUP_FAILURE after unsuccessful signup', () => {
      const email = 'john.doe@email.com';
      const password = 'wrongpassword';

      mockSignupApiError();

      const expectedActions = [
        { type: types.SIGNUP_START },
        { type: types.SIGNUP_FAILURE }
      ];

      const store = mockStore({});

      return store.dispatch(actions.signup(email, password))
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions);
        });
    });

    it('creates SIGNUP_FAILURE after failed signup', () => {
      const email = 'john.doe@email.com';
      const password = 'wrongpassword';

      mockSignupFailure();

      const expectedActions = [
        { type: types.SIGNUP_START },
        { type: types.SIGNUP_FAILURE }
      ];

      const store = mockStore({});

      return store.dispatch(actions.signup(email, password))
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions);
        });
    });

    it('creates an action for login ui reset', () => {
      const expectedAction = {
        type: types.LOGIN_UI_RESET
      };

      expect(actions.loginUIReset()).to.deep.equal(expectedAction);
    });

    it('creates an action for sign up ui reset', () => {
      const expectedAction = {
        type: types.SIGNUP_UI_RESET
      };

      expect(actions.signupUIReset()).to.deep.equal(expectedAction);
    });
  });
});
