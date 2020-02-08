import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './MessageSendForm.css';

function MessageSendForm({
  onSubmit,
  children,
  className,
  encType,
}) {
  const classes = classNames(
    'MessageSendForm',
    className,
  );

  return (
    <form onSubmit={onSubmit} className={classes} encType={encType}>
      <h1 className="Heading MessageSendForm-mainHeading">Отправлялка сообщений</h1>
      {children}
    </form>
  );
}

MessageSendForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  encType: PropTypes.string,
};

MessageSendForm.defaultProps = {
  children: null,
  className: '',
  encType: '',
};

export default MessageSendForm;
