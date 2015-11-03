import React from 'react';

import Navigation from './Navigation';
import PropTypes from '../constants/PropTypes';

export default function Frontpage({ childCategories }) {
  return (
    <div>
      <h2>Frontpage</h2>

      <Navigation childCategories={childCategories} />
    </div>
  );
}

Frontpage.propTypes = {
  childCategories: PropTypes.arrayOf(PropTypes.category),
};
