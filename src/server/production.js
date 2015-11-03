import 'isomorphic-fetch';

import React from 'react';
import express from 'express';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import { createMemoryHistory } from 'history';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { reduxReactRouter, match } from 'redux-router/server';

import Page from '../common/components/Page';
import api from './api';
import createStore from '../common/store';
import routes from '../common/routes';

const port = process.env.PORT || 3000;
const app = express();

app.use('/api', api);
app.use(express.static('public'));

app.use((req, res, next) => {
  const store = createStore(reduxReactRouter, routes, createMemoryHistory);

  store.dispatch(match(req.originalUrl, (error, redirectLocation, routerState) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      return next(error);
    } else if (!routerState) {
      res.status(500);
    } else {
      const promises = routerState.components
        .filter(component => component.fetchData)
        .map(component => component.fetchData({ dispatch: store.dispatch }));

      Promise.all(promises)
        .then(() => {
          const application = renderToString(
            <Provider store={store} key="provider">
              <ReduxRouter routes={routes} />
            </Provider>
          );

          const state = store.getState();
          const page = renderToStaticMarkup(
            <Page state={state}>{application}</Page>
          );

          res.send('<!doctype html>' + page);
        })
        .catch(next);
    }
  }));
});

app.use((err, req, res, ) => {
  res.send({ message: err.message });
});

app.listen(port);
