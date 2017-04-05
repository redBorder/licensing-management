import React from 'react';
import { render } from 'react-dom';
import App from './app.jsx';
import path from 'path';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

render(
  <App />,
  document.getElementById('root')
);
