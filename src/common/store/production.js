import { applyMiddleware, createStore, compose } from 'redux';
import { useQueries } from 'history';
import thunk from 'redux-thunk';

import reducer from '../reducers';

export default function createStoreWithMiddleware(reduxReactRouter, routes, createHistory, initialState) {
  const store = compose(
    applyMiddleware(thunk),
    reduxReactRouter({
      routes,
      createHistory: useQueries(createHistory),
    })
  )(createStore)(reducer, initialState);

  return store;
}
