import React from 'react';

const style = {
  fontFamily: 'sans-serif',
};

export default function Application({ children }) {
  return (
    <div style={style}>
      <h1>Redux Universal Test</h1>

      {children}
    </div>
  );
}
