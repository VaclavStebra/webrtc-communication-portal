import React from 'react';
import { Link } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

export default class ApplicationBar extends React.Component {
  render() {
    return (
      <AppBar
        title="WebRTC communication portal"
        showMenuIconButton={false}
        iconElementRight={
          <Link to="/login">
            <FlatButton label="Login" />
          </Link>
        }
      />
    );
  }
}
