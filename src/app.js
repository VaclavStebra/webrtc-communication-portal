import React from 'react';
import ReactDOM from 'react-dom';

import Root from './components/Root';

const mountPoint = document.getElementById('react');

ReactDOM.render(
  (
    <Root />
  ),
  mountPoint
);
