import React from 'react';
import { Link } from 'react-router-dom';

import RaisedButton from 'material-ui/RaisedButton';

export default class HomePage extends React.Component {
  render() {
    return (
      <div>
        <h1>/ route</h1>
        <Link to="/test">
          <RaisedButton label="Test" primary />
        </Link>
      </div>
    );
  }
}
