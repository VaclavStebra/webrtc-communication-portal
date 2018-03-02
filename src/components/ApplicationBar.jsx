import React from 'react';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';

import { GITHUB_REPO } from '../constants/links';

export default class ApplicationBar extends React.Component {
  render() {
    return (
      <AppBar
        title="WebRTC communication portal"
        showMenuIconButton={false}
        iconElementRight={
          <IconButton iconClassName="material-icons" href={GITHUB_REPO}>
            code
          </IconButton>
        }
      />
    );
  }
}
