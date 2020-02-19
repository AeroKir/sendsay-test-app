import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Input.css';

function Input({
  id,
  type,
  name,
  className,
  label,
  placeholder,
  error,
  errorMessage,
  onChange,
  onBlur,
  inputHalfLeft,
  inputHalfRight,
}) {
  const wrapperClasses = classNames(
    'InputWrapper',
    className,
    {
      'InputWrapper--halfLeft': inputHalfLeft,
      'InputWrapper--halfRight': inputHalfRight,
    },
  );

  const inputClasses = classNames(
    'Input',
    className,
    {
      'Input--halfLeft': inputHalfLeft,
      'Input--halfRight': inputHalfRight,
    },
  );

  const labelClasses = classNames(
    'Input-label',
    className,
  );

  const errorMessageClasses = classNames('is-error');

  return (
    <div className={wrapperClasses}>
      <label htmlFor={id} className={labelClasses}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        className={inputClasses}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <span className={errorMessageClasses}>{errorMessage}</span>}
    </div>
  );
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  inputHalfLeft: PropTypes.bool,
  inputHalfRight: PropTypes.bool,
};

Input.defaultProps = {
  name: '',
  className: '',
  label: '',
  placeholder: 'Input placeholder',
  error: false,
  errorMessage: '',
  onChange: () => { },
  onBlur: () => { },
  inputHalfLeft: false,
  inputHalfRight: false,
};

export default Input;
