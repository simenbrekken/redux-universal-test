import { applyMiddleware, createStore, compose } from 'redux';
import { useQueries } from 'history';
import thunk from 'redux-thunk';

import { instrument } from '../containers/DevTools';
import reducer from '../reducers';

export default function createStoreWithMiddleware(reduxReactRouter, routes, createHistory, initialState) {
  const store = compose(
    applyMiddleware(thunk),
    reduxReactRouter({
      routes,
      createHistory: useQueries(createHistory),
    }),
    instrument(),
  )(createStore)(reducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');

      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
