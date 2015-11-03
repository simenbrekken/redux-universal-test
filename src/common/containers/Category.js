import React, { Component } from 'react';
import { connect } from 'react-redux';

import Loader from '../components/Loader';
import PropTypes from '../constants/PropTypes';
import fetchData from '../decorators/fetchData';
import loader from '../decorators/loader';
import { fetchCategoriesIfNeeded } from '../actions';

function mapStateToProps({ categories, router }) {
  return {
    category: categories.byId[router.params.categoryId],
  };
}

@connect(mapStateToProps)
@fetchData(({ dispatch }) => {
  return dispatch(fetchCategoriesIfNeeded());
})
@loader(Loader)
export default class Category extends Component {
  static propTypes = {
    category: PropTypes.category,
  }

  render() {
    const { category } = this.props;

    return (
      <div>{category.name}</div>
    );
  }
}
