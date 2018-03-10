import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

export default class ApplicationBar extends React.Component {
  getIconElementRight() {
    if (!this.props.isUserLoggedIn) {
      return (
        <FlatButton
          label="Login"
          containerElement={<Link to="/login" />}
        />
      );
    }
    return (
      <IconMenu
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuItem
          primaryText="Sign out"
          onClick={this.props.onLogout}
        />
      </IconMenu>
    );
  }

  render() {
    return (
      <AppBar
        title="WebRTC communication portal"
        showMenuIconButton={false}
        iconElementRight={this.getIconElementRight()}
      />
    );
  }
}

ApplicationBar.propTypes = {
  isUserLoggedIn: PropTypes.bool,
  onLogout: PropTypes.func
};

ApplicationBar.defaultProps = {
  isUserLoggedIn: false,
  onLogout: () => {}
};
