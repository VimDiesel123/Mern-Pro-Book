import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import Page from '../src/Page.jsx';
import store from '../src/store.js';

// eslint-disable-next-line no-underscore-dangle
store.initialData = window.__INITIAL_DATA__;

if (module.hot) {
  module.hot.accept();
}

const clientId = window.ENV.GOOGLE_CLIENT_ID;

const element = (
  <GoogleOAuthProvider clientId={clientId}>
    <Router>
      <Page />
    </Router>
  </GoogleOAuthProvider>
);

ReactDOM.hydrate(element, document.getElementById('contents'));
