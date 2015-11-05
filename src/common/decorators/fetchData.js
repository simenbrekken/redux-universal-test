import React, { PropTypes } from 'react';
import PureComponent from 'react-pure-render/component';
import { connect } from 'react-redux';

import { getDisplayName } from '../utils';

export default function(fetch) {
  return WrappedComponent => {
    class FetchData extends PureComponent {
      static fetchData = fetch;

      static propTypes = {
        dispatch: PropTypes.func.isRequired,
      }

      componentDidMount() {
        fetch(this.props);
      }

      componentWillReceiveProps(nextProps) {
        fetch(nextProps);
      }

      render() {
        return (
          <WrappedComponent {...this.props} />
        );
      }
    }

    FetchData.displayName = `FetchData(${getDisplayName(WrappedComponent)})`;
    FetchData.WrappedComponent = WrappedComponent;

    return connect()(FetchData);
  };
}
