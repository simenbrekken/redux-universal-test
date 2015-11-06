import { Children, Component, PropTypes } from 'react';
import sideEffect from 'react-side-effect';

function reducePropsToState(propsList) {
  return {
    title: propsList.map(props => props.title).join(' › '),
  };
}

function handleStateChangeOnClient({ title = '' }) {
  document.title = title;
}

@sideEffect(reducePropsToState, handleStateChangeOnClient)
export default class Metadata extends Component {
  static propTypes = {
    title: PropTypes.string,
    children: PropTypes.element,
  }

  render() {
    const { children } = this.props;

    return children ? Children.only(children) : null;
  }
}
