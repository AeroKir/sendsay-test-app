import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Portal extends React.Component {
  constructor(props) {
    super(props);
    this.element = document.createElement('div');
  }

  componentDidMount() {
    document.body.appendChild(this.element);
  }

  componentWillUnmount() {
    document.body.removeChild(this.element);
  }

  render() {
    const { children } = this.props;

    return ReactDOM.createPortal(children, this.element);
  }
}

Portal.propTypes = {
  children: PropTypes.node,
};

Portal.defaultProps = {
  children: null,
};

export default Portal;
