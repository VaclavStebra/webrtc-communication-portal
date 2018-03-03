import React from 'react';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

export default class ApplicationBar extends React.Component {
  render() {
    return (
      <AppBar
        title="WebRTC communication portal"
        showMenuIconButton={false}
        iconElementRight={
          <FlatButton label="Login" />
        }
      />
    );
  }
}
