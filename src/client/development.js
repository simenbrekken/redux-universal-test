import React from 'react';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import { createHistory } from 'history';
import { reduxReactRouter } from 'redux-router';
import { render } from 'react-dom';

import DevTools from '../common/containers/DevTools';
import createStore from '../common/store';
import routes from '../common/routes';

const store = createStore(reduxReactRouter, routes, createHistory);

render(
  <Provider store={store} key="provider">
    <div>
      <ReduxRouter routes={routes} />
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('application')
);
