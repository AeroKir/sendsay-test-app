import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './InputTypeFile.css';

const InputTypeFile = React.forwardRef(({
  id,
  name,
  className,
  onChange,
  onFocus,
  onClick,
  label,
  withoutLabel,
}, ref) => {
  const wrapperClasses = classNames(
    'InputTypeFileWrapper',
    className,
  );

  const inputClasses = classNames(
    'InputTypeFile',
    className,
  );

  const labelClasses = classNames(
    'InputTypeFile-label',
    className,
    { 'InputTypeFile-withoutLabel': withoutLabel },
  );

  return (
    <div className={wrapperClasses}>
      <input
        id={id}
        type="file"
        ref={ref}
        name={name}
        className={inputClasses}
        onChange={onChange}
        onFocus={onFocus}
        onClick={onClick}
        multiple
      />
      <label htmlFor={id} className={labelClasses}>
        {label}
      </label>
    </div>
  );
});

InputTypeFile.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  name: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onClick: PropTypes.func,
  label: PropTypes.string,
  withoutLabel: PropTypes.bool,
};

InputTypeFile.defaultProps = {
  id: '',
  name: '',
  className: '',
  onChange: () => { },
  onFocus: () => { },
  onClick: () => { },
  label: '',
  withoutLabel: false,
};

export default InputTypeFile;
