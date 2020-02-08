import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './ExtraContentBlock.css';

function ExtraContentBlock({ children, className }) {
  const classes = classNames(
    'ExtraContentBlock',
    className,
  );

  return (
    <div className={classes}>
      {children}
    </div>
  );
}

ExtraContentBlock.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

ExtraContentBlock.defaultProps = {
  children: 'Default button',
  className: '',
};

export default ExtraContentBlock;
