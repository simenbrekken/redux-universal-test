import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Category from '../components/Category';
import Loader from '../components/Loader';
import PropTypes from '../constants/PropTypes';
import fetchData from '../decorators/fetchData';
import loader from '../decorators/loader';
import { fetchCategories, fetchCategoriesIfNeeded } from '../actions';
import { getAncestorCategories, getChildCategories } from '../utils';

function mapStateToProps({ categories, router }) {
  const categoryId = +router.params.categoryId;

  return {
    category: categories.byId[categoryId],
    parentCategory: getAncestorCategories(categories, categoryId)[1],
    childCategories: getChildCategories(categories, categoryId),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ reloadCategories: fetchCategories }, dispatch);
}

@fetchData(({ dispatch }) => {
  return dispatch(fetchCategoriesIfNeeded());
})
@connect(mapStateToProps, mapDispatchToProps)
@loader(Loader)
export default class CategoryContainer extends Component {
  static propTypes = {
    category: PropTypes.category.isRequired,
    parentCategory: PropTypes.category,
    childCategories: PropTypes.arrayOf(PropTypes.category).isRequired,
    reloadCategories: PropTypes.func.isRequired,
  }

  render() {
    const { category, childCategories, parentCategory, reloadCategories } = this.props;

    return (
      <Category
        category={category}
        childCategories={childCategories}
        parentCategory={parentCategory}
        reloadCategories={reloadCategories}
      />
    );
  }
}
