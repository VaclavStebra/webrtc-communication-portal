import React from 'react';
import ReactDOM from 'react-dom';

import Test from './components/test';

const mountPoint = document.getElementById('react');

ReactDOM.render(
  (
    <Test />
  ),
  mountPoint,
);
