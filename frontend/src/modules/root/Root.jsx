import React from 'react';
import PropTypes from 'prop-types';

import { Route, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import { connect } from 'react-redux';

import ApplicationBar from '../applicationBar/ApplicationBar';

import { history } from '../../stores/configureStore';

import HomePage from '../home/HomePage';
import LoginPageContainer from '../user/LoginPage';
import SignupPageContainer from '../user/SignUpPage';
import CreateMeetingPageContainer from '../meeting/CreateMeetingPage';
import MeetingPageContainer from '../meeting/MeetingPage';

import { loginUIReset, logout, signupUIReset } from '../user/actions/userActions';
import { createUIReset } from '../meeting/actions/meetingActions';
import { addParticipant } from '../meeting/actions/participantsActions';

import socketSetup from '../../sockets/';

export class Root extends React.Component {
  render() {
    return (
      <div>
        <ConnectedRouter history={history}>
          <div>
            <ApplicationBar
              isUserLoggedIn={this.props.isUserLoggedIn}
              onLogout={this.props.onLogout}
            />
            <div className="container">
              <div>
                <Route
                  path="/"
                  exact
                  component={HomePage}
                />
                <Route
                  path="/login"
                  exact
                  render={() => {
                    if (this.props.isUserLoggedIn) {
                      return <Redirect to="/meeting/create" />;
                    }
                    this.props.loginUIReset();
                    return <LoginPageContainer />;
                  }}
                />
                <Route
                  path="/signup"
                  exact
                  render={() => {
                    if (this.props.isUserLoggedIn) {
                      return <Redirect to="/" />;
                    }
                    this.props.signupUIReset();
                    return <SignupPageContainer />;
                  }}
                />
                <Route
                  path="/meeting/create"
                  exact
                  render={() => {
                    this.props.createMeetingUIReset();
                    return <CreateMeetingPageContainer />;
                  }}
                />
                <Route
                  path="/meeting/detail/:id"
                  exact
                  render={({ match }) => {
                    window.socket = socketSetup(
                      this.props.dispatch,
                      this.props.token,
                      match.params.id,
                      this.props.userId
                    );

                    if (this.props.userId) {
                      this.props.addParticipant({ id: this.props.userId, email: this.props.email });
                    } else {
                      this.props.addParticipant({ id: 'anonymousUser', email: 'anonymous' });
                    }

                    return (
                      <MeetingPageContainer
                        meetingId={match.params.id}
                      />
                    );
                  }}
                />
              </div>
            </div>
          </div>
        </ConnectedRouter>
      </div>
    );
  }
}

Root.propTypes = {
  isUserLoggedIn: PropTypes.bool,
  onLogout: PropTypes.func,
  loginUIReset: PropTypes.func,
  signupUIReset: PropTypes.func,
  createMeetingUIReset: PropTypes.func,
  addParticipant: PropTypes.func,
  dispatch: PropTypes.func,
  token: PropTypes.string,
  email: PropTypes.string,
  userId: PropTypes.string
};

Root.defaultProps = {
  isUserLoggedIn: false,
  token: '',
  email: '',
  userId: '',
  onLogout: () => {},
  loginUIReset: () => {},
  signupUIReset: () => {},
  createMeetingUIReset: () => {},
  addParticipant: () => {},
  dispatch: () => {}
};

const mapStateToProps = state => ({
  isUserLoggedIn: state.user.data !== null,
  token: state.user.data ? state.user.data.token : '',
  email: state.user.data ? state.user.data.email : '',
  userId: state.user.data ? state.user.data.id : ''
});

const mapDispatchToProps = dispatch => ({
  onLogout: () => {
    dispatch(logout());
  },
  loginUIReset: () => {
    dispatch(loginUIReset());
  },
  signupUIReset: () => {
    dispatch(signupUIReset());
  },
  createMeetingUIReset: () => {
    dispatch(createUIReset());
  },
  addParticipant: (participant) => {
    dispatch(addParticipant(participant));
  },
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);
