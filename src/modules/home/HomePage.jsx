import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';

import { FI, FI_ME, GITHUB, GITHUB_REPO } from '../../constants/links';

export default class HomePage extends React.Component {
  render() {
    return (
      <div>
        <h2>What is it?</h2>
        <Divider />
        <List>
          <ListItem
            primaryText="
              Communication portal built using modern Web Technologies such as WebRTC
              "
            disabled
          />
          <ListItem disabled>
            {'Master\'s'} thesis at <a href={FI} target="_blank">FI MUNI</a>
          </ListItem>
        </List>
        <h2>Who built it?</h2>
        <Divider />
        <p />
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
              <FontIcon className="muidocs-icon-custom-github" />
            }
          />
        </div>
        <h2>Source code</h2>
        <Divider />
        <p />
        <RaisedButton
          href={GITHUB_REPO}
          target="_blank"
          label="Source code"
          primary
          icon={
            <FontIcon className="muidocs-icon-custom-github" />
          }
        />
      </div>
    );
  }
}
