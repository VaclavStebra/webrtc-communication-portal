import React from 'react';

import UserForm from './components/UserForm';

export class SignUpPage extends React.Component {
  render() {
    return (
      <div className="center">
        <h1>Sign Up</h1>
        <div>
          <UserForm
            submitText="Sign up"
            linkText="Log in"
            linkHref="/login"
            onSubmit={() => {}}
          />
        </div>
      </div>
    );
  }
}

export default SignUpPage;
