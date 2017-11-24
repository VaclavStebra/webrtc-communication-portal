import React from 'react';
import { Link } from 'react-router-dom';

export default class TestPage extends React.Component {
  render() {
    return (
      <div>
        <h1>/test route</h1>
        <Link to="/">
          Root
        </Link>
      </div>
    );
  }
}
