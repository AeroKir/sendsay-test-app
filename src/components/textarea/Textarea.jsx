import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Textarea.css';

function Textarea({
  id, className, label, name, placeholder, onChange, onBlur, error, errorMessage,
}) {
  const wrapperClasses = classNames(
    'TextareaWrapper',
    className,
  );

  const labelClasses = classNames(
    'Textarea-label',
    className,
  );

  const textareaClasses = classNames(
    'Textarea',
    className,
  );

  const errorMessageClasses = classNames('is-error-textarea');

  return (
    <div className={wrapperClasses}>
      <label htmlFor={id} className={labelClasses}>
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        className={textareaClasses}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <span className={errorMessageClasses}>{errorMessage}</span>}
    </div>
  );
}

Textarea.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
};

Textarea.defaultProps = {
  className: '',
  label: '',
  name: '',
  placeholder: 'Textarea placeholder',
  onChange: () => { },
  onBlur: () => { },
  error: false,
  errorMessage: '',
};

export default Textarea;
