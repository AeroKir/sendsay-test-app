import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '../button/Button';
import Icon from '../icon/Icon';

import './AttachedFileField.css';
import iconTrash from '../../icons/icon-clip-big.svg';

function AttachedFileField({
  id,
  className,
  fileName,
  onClick,
  firstInRow,
  children,
}) {
  const wrapperClasses = classNames(
    'AttachedFileFieldWrapper',
    className,
  );

  const elementClasses = classNames(
    'AttachedFileField',
    className,
    { 'AttachedFileField--firstInRow': firstInRow },
  );

  return (
    <div className={wrapperClasses}>
      <div className={elementClasses} id={id}>
        <Icon
          className="AttachedFileField-icon"
          src={iconTrash}
          alt="Trash icon"
        />
        <span className="AttachedFileField-fileNameField">{fileName}</span>
        <Button
          type="button"
          className="AttachedFileField-button"
          buttonText="Удалить"
          onClick={onClick}
        />
      </div>
      {children}
    </div>
  );
}

AttachedFileField.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  className: PropTypes.string,
  fileName: PropTypes.string,
  firstInRow: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

AttachedFileField.defaultProps = {
  id: '',
  className: '',
  fileName: '',
  firstInRow: false,
  onClick: () => { },
  children: null,
};

export default AttachedFileField;
