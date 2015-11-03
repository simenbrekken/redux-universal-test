import React from 'react';
import PureComponent from 'react-pure-render/component';

import { getDisplayName } from '../utils';

function getComponentRequiredProps({ propTypes }) {
  return Object.keys(propTypes).filter(key => propTypes[key].isRequired);
}

export default function(LoaderComponent = null, ownRequiredProps) {
  return WrappedComponent => {
    const requiredProps = ownRequiredProps || getComponentRequiredProps(WrappedComponent);

    class Loader extends PureComponent {
      render() {
        const loaded = requiredProps.every(key => this.props[key]);
        const Component = loaded ? WrappedComponent : LoaderComponent;

        return (
          <Component {...this.props} />
        );
      }
    }

    Loader.displayName = `Loader(${getDisplayName(WrappedComponent)})`;
    Loader.WrappedComponent = WrappedComponent;

    return Loader;
  };
}
