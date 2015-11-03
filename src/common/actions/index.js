const port = process.env.PORT || 3000;

export function fetchCategories() {
  return dispatch => {
    dispatch({ type: 'FETCH_CATEGORIES' });

    return fetch(`http://localhost:${port}/api/categories`)
      .then(res => res.json())
      .then(payload => dispatch({ type: 'FETCH_CATEGORIES_COMPLETED', payload }))
      .catch(err => {
        dispatch({ type: 'FETCH_CATEGORIES_FAILED', error: err });

        throw err;
      });
  };
}

export function fetchCategoriesIfNeeded() {
  return (dispatch, getState) => {
    const categories = getState().categories;

    if (categories.isFetching || categories.order.length > 0) {
      return false;
    }

    return dispatch(fetchCategories());
  };
}
