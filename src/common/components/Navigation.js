import React from 'react';
import Link from 'react-router/lib/Link';

import PropTypes from '../constants/PropTypes';

const style = {
  marginRight: '10px',
};

function NavigationItem({ id, name }) {
  const href = `/categories/${id}`;

  return (
    <Link key={id} to={href} style={style}>{name}</Link>
  );
}

export default function Navigation({ childCategories = [] }) {
  return (
    <div>
      {childCategories.map(NavigationItem)}
    </div>
  );
}

Navigation.propTypes = {
  childCategories: PropTypes.arrayOf(PropTypes.category),
};

