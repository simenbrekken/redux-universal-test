import React from 'react';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import { createHistory } from 'history';
import { reduxReactRouter } from 'redux-router';
import { render } from 'react-dom';

import createStore from '../common/store';
import routes from '../common/routes';

const initialState = window.__initialState;
const store = createStore(reduxReactRouter, routes, createHistory, initialState);

render(
  <Provider store={store} key="provider">
    <ReduxRouter routes={routes} />
  </Provider>,
  document.getElementById('application')
);
