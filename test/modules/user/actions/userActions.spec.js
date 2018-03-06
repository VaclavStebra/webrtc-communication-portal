import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from '../../../../src/modules/user/actions/userActions';
import * as types from '../../../../src/modules/user/constants/ActionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('User module', () => {
  describe('User actions', () => {
    it('creates an action to login user', () => {
      const email = 'john.doe@email.com';
      const expectedAction = {
        type: types.LOGIN_SUCCESS,
        email
      };

      expect(actions.loginSuccess(email)).to.deep.equal(expectedAction);
    });
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

  it('creates LOGIN after successful login', () => {
    const email = 'john.doe@email.com';
    const password = 'password';

    const expectedActions = [
      { type: types.LOGIN_START },
      { type: types.LOGIN_SUCCESS, email }
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
});
