import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';

const initialState = {
  order: [],
  byId: {},
};

function categoriesReducer(state = initialState, action) {
  switch (action.type) {
  case 'FETCH_CATEGORIES':
    return { ...initialState, isFetching: true };
  case 'FETCH_CATEGORIES_FAILED':
    return { ...state, isFetching: false, error: action.error };
  case 'FETCH_CATEGORIES_COMPLETED':
    const categories = action.payload;

    return {
      ...state,
      isFetching: false,
      order: categories.map(({ id }) => id),
      byId: categories.reduce((result, category) => {
        result[category.id] = category;

        return result;
      }, {}),
    };
  default:
    return state;
  }
}

export default combineReducers({
  router: routerStateReducer,
  categories: categoriesReducer,
});
