import React from 'react';
import Link from 'react-router/lib/Link';

import Metadata from './Metadata';
import Navigation from './Navigation';
import PropTypes from '../constants/PropTypes';

const reloadButtonStyle = {
  marginTop: '25px',
};

export default function Category({ category, childCategories, parentCategory: { id, name } = {}, reloadCategories }) {
  const label = name || 'Frontpage';
  const href = id ? `/categories/${id}` : '/';

  return (
    <div>
      <Metadata title={category.name} />

      <h2>
        <Link to={href}>{label}</Link> / {category.name}
      </h2>

      <Navigation childCategories={childCategories} />

      <button style={reloadButtonStyle} onClick={reloadCategories}>Reload categories</button>
    </div>
  );
}

Category.propTypes = {
  category: PropTypes.category.isRequired,
  parentCategory: PropTypes.category,
  childCategories: PropTypes.arrayOf(PropTypes.category).isRequired,
  reloadCategories: PropTypes.func.isRequired,
};
