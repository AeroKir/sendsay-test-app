import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../icon/Icon';

import './InfoBlock.css';

function InfoBlock({
  children,
  className,
  infoBlockHeading,
  infoBlockMessage,
  transparent,
  positionAbsolute,
  src,
  alt,
  showIcon,
  footerContent,
}) {
  const infoBlockClasses = classNames(
    'InfoBlock',
    className,
    {
      'InfoBlock--transparent': transparent,
      'InfoBlock--positionAbsolute': positionAbsolute,
    },
  );

  const infoBlockIconClasses = classNames(
    'InfoBlock-icon',
    { 'is-showed': showIcon },
  );

  return (
    <div className={infoBlockClasses}>
      <div className="InfoBlock-content">
        <Icon src={src} alt={alt} className={infoBlockIconClasses} />
        <h1 className="InfoBlock-mainHeading">{infoBlockHeading}</h1>
        <p className="InfoBlock-message">
          {infoBlockMessage}
        </p>
        {children}
      </div>
      <footer className="InfoBlock-footer">{footerContent}</footer>
    </div>
  );
}

InfoBlock.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  infoBlockHeading: PropTypes.string,
  infoBlockMessage: PropTypes.node,
  transparent: PropTypes.bool,
  positionAbsolute: PropTypes.bool,
  src: PropTypes.string,
  alt: PropTypes.string,
  showIcon: PropTypes.bool,
  footerContent: PropTypes.node,
};

InfoBlock.defaultProps = {
  children: null,
  className: '',
  infoBlockHeading: 'Info Block Heading',
  infoBlockMessage: 'Info Block Message',
  transparent: false,
  positionAbsolute: false,
  src: '',
  alt: '',
  showIcon: false,
  footerContent: null,
};

export default InfoBlock;
