import React from 'react';
import { Link } from 'react-router-dom';

import RaisedButton from 'material-ui/RaisedButton';

export default class TestPage extends React.Component {
  render() {
    return (
      <div>
        <h1>/test route</h1>
        <Link to="/">
          <RaisedButton label="Root" secondary />
        </Link>
      </div>
    );
  }
}
