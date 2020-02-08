import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Portal from '../portal/Portal';
import Button from '../button/Button';

import './Modal.css';

function Modal({
  isOpen,
  className,
  modalHeading,
  modalContent,
  onCancel,
  onSubmit,
  children,
}) {
  const modalClasses = classNames(
    'Modal',
    className,
  );

  const modalInnerClasses = classNames(
    'ModalInner',
    className,
  );

  return (
    <>
      {isOpen && (
        <Portal>
          <div className={modalClasses}>
            <div className={modalInnerClasses}>
              <h1 className="Modal-heading">{modalHeading}</h1>
              <p className="Modal-content">{modalContent}</p>
              {children}
              <footer className="Modal-footer">
                <Button
                  type="button"
                  className="Modal-button Modal-button--cancel"
                  buttonText="Отмена"
                  onClick={onCancel}
                />
                <Button
                  type="submit"
                  className="Modal-button Modal-button--confirm"
                  buttonText="Подтвердить"
                  onClick={onSubmit}
                />
              </footer>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool,
  className: PropTypes.string,
  modalHeading: PropTypes.string,
  modalContent: PropTypes.string,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  children: PropTypes.node,
};

Modal.defaultProps = {
  isOpen: false,
  className: '',
  modalHeading: 'Modal heading',
  modalContent: 'Modal content',
  onCancel: () => { },
  onSubmit: () => { },
  children: null,
};

export default Modal;
