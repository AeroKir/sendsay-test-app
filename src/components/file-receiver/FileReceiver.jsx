/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import InputTypeFile from '../input/InputTypeFile';

import './FileReceiver.css';

function FileReceiver({
  className,
  onDragOver,
  onDragLeave,
  onDrop,
  onChange,
  dragOver,
  onClick,
  onKeyPress,
  refInput,
}) {
  const fileReceiverClasses = classNames(
    'FileReceiver',
    className,
  );

  const dragZoneClasses = classNames(
    'FileReceiver-dragZone',
    className,
    { 'is-dragOver': dragOver },
  );

  return (
    <div className={fileReceiverClasses}>
      <div
        className={dragZoneClasses}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onChange={onChange}
        onClick={onClick}
        onKeyPress={onKeyPress}
        role="dialog"
      >
        <div className="FileReceiver-content">
          <h1 className="FileReceiver-mainHeading">Бросайте файлы сюда, я ловлю</h1>
          <p className="FileReceiver-explanation">
            Мы принимаем картинки (jpg, png, gif), офисные файлы (doc, xls, pdf) и zip-архивы.
            Размеры файла до 5 МБ
          </p>
        </div>
        <InputTypeFile ref={refInput} onClick={onClick} withoutLabel />
      </div>
    </div>
  );
}

FileReceiver.propTypes = {
  className: PropTypes.string,
  onDragOver: PropTypes.func,
  onDragLeave: PropTypes.func,
  onDrop: PropTypes.func,
  onChange: PropTypes.func,
  dragOver: PropTypes.bool,
  onClick: PropTypes.func,
  onKeyPress: PropTypes.func,
  refInput: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(HTMLInputElement) }),
  ]),
};

FileReceiver.defaultProps = {
  className: '',
  onDragOver: () => { },
  onDragLeave: () => { },
  onDrop: () => { },
  onChange: () => { },
  dragOver: false,
  onClick: () => { },
  onKeyPress: () => { },
  refInput: () => { },
};

export default FileReceiver;
