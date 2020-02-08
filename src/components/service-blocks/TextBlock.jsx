import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './TextBlock.css';

function TextBlock({ children, className }) {
  const classes = classNames(
    'TextBlock',
    className,
  );

  return (
    <span className={classes}>
      {children}
    </span>
  );
}

TextBlock.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

TextBlock.defaultProps = {
  children: 'Default button',
  className: '',
};

export default TextBlock;
