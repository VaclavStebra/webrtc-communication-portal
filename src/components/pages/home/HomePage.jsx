import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';

import { FI, FI_ME, GITHUB } from '../../../constants/links';

export default class HomePage extends React.Component {
  render() {
    return (
      <div>
        <h2>What is it?</h2>
        <Divider />
        <List>
          <ListItem disabled>
            Final {'Master\'s'} thesis at <a href={FI}>FI MUNI</a>
          </ListItem>
          <ListItem
            primaryText="
              Communication portal built using modern Web Technologies such as WebRTC
              "
            disabled
          />
        </List>
        <Divider />
        <h2>Who build it?</h2>
        <div>
          <RaisedButton
            href={FI_ME}
            target="_blank"
            label="Václav Štěbra"
            primary
            icon={
              <FontIcon className="material-icons">
                account_box
              </FontIcon>
            }
          />

          &nbsp;<RaisedButton
            href={GITHUB}
            target="_blank"
            label="Github"
            secondary
            icon={
              <FontIcon className="material-icons">
                code
              </FontIcon>
            }
          />
        </div>
      </div>
    );
  }
}
