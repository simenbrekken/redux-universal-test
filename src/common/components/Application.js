import React from 'react';

import Metadata from './Metadata';

const style = {
  fontFamily: 'sans-serif',
};

export default function Application({ children }) {
  return (
    <div style={style}>
      <Metadata title="Redux Universal Test" />
      <h1>Redux Universal Test</h1>

      {children}
    </div>
  );
}
