import React, { PropTypes } from 'react';

function initialState(state) {
  if (state) {
    const script = `window.__initialState=${JSON.stringify(state)};`;

    return (
      <script dangerouslySetInnerHTML={{ __html: script }} />
    );
  }
}

export default function Page({ children, state, metadata: { title } = {} }) {
  return (
    <html>
      <head>
        <title>{title}</title>
      </head>

      <body>
        <div id="application" dangerouslySetInnerHTML={{ __html: children }}></div>
        {initialState(state)}
        <script src="/bundle.js"></script>
      </body>
    </html>
  );
}

Page.propTypes = {
  children: PropTypes.string,
};
