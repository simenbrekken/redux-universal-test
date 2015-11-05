import React, { Component } from 'react';
import { connect } from 'react-redux';

import Frontpage from '../components/Frontpage';
import PropTypes from '../constants/PropTypes';
import fetchData from '../decorators/fetchData';
import { fetchCategoriesIfNeeded } from '../actions';
import { getChildCategories } from '../utils';

function mapStateToProps({ categories }) {
  return {
    childCategories: getChildCategories(categories),
  };
}

@connect(mapStateToProps)
@fetchData(({ dispatch }) => {
  return dispatch(fetchCategoriesIfNeeded());
})
export default class FrontpageContainer extends Component {
  static propTypes = {
    childCategories: PropTypes.arrayOf(PropTypes.category).isRequired,
  }

  render() {
    const { childCategories } = this.props;

    return (
      <Frontpage childCategories={childCategories} />
    );
  }
}
