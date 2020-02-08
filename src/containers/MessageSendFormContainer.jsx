import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import MessageSendForm from '../components/message-send-form/MessageSendForm';
import Input from '../components/input/Input';
import Textarea from '../components/textarea/Textarea';
import Button from '../components/button/Button';
import InfoBlock from '../components/service-blocks/InfoBlock';
import FileAttachmentContainer from './FileAttachmentContainer';

import getInputValue from '../actions/getInputValue';
import getSentMessageInfo from '../actions/getSentMessageInfo';
import resetFormState from '../actions/resetFormState';
import { sendFilledForm, getSentMessageID } from '../actions/networkRequestsActions';

import sendFormConfig from '../config/sendFormConfig';
import getDateAndMonth from '../utilities/getDateAndMonth';

function validateForm(
  senderName,
  senderEmail,
  receiverName,
  receiverEmail,
  messageSubject,
  messageText,
) {
  const validateEmailPattern = /\S+@\S+\.\S+/;
  const validateSenderEmail = senderEmail.match(validateEmailPattern);
  const validateReceiverEmail = receiverEmail.match(validateEmailPattern);

  /**
   * "true" means that our form is invalid.
   * Will evaluate to "false" when a user fills inputs correctly.
   */

  return {
    senderName: senderName.length === 0,
    senderEmail: senderEmail.length === 0 || validateSenderEmail === null,
    receiverName: receiverName.length === 0,
    receiverEmail: receiverEmail.length === 0 || validateReceiverEmail === null,
    messageSubject: messageSubject.length === 0,
    messageText: messageText.length === 0,
  };
}

class MessageSendFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMessageSendFormShowed: true,
      isInfoBlockShowed: false,

      senderName: '',
      senderEmail: '',
      receiverName: '',
      receiverEmail: '',
      messageSubject: '',
      messageText: '',

      touched: {
        senderName: false,
        senderEmail: false,
        receiverName: false,
        receiverEmail: false,
        messageSubject: false,
        messageText: false,
      },
    };

    this.baseState = this.state;

    this.fileInput = React.createRef();

    this.handleInputChange = this.handleInputChange.bind(this);
    this.canBeSubmitted = this.canBeSubmitted.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
    this.toggleInfoBlock = this.toggleInfoBlock.bind(this);
  }

  handleInputChange(event) {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });

    const { getInputVal } = this.props;
    getInputVal(name, value);
  }

  handleInputBlur(event) {
    const { name } = event.target;
    const { touched } = this.state;
    this.setState({
      touched: { ...touched, [name]: true },
    });
  }

  canBeSubmitted() {
    const {
      senderName,
      senderEmail,
      receiverName,
      receiverEmail,
      messageSubject,
      messageText,
    } = this.state;

    const errors = validateForm(senderName, senderEmail, receiverName, receiverEmail, messageSubject, messageText);
    const isDisabled = Object.keys(errors).some((x) => errors[x]);

    return !isDisabled;
  }

  toggleInfoBlock() {
    this.hideWithTimer();
    this.setState((prevState) => ({
      isMessageSendFormShowed: !prevState.isMessageSendFormShowed,
      isInfoBlockShowed: !prevState.isInfoBlockShowed,
    }));
  }

  hideWithTimer() {
    this.timer = setTimeout(() => {
      this.toggleAndResetForm();
    }, 5000);
  }


  toggleAndResetForm() {
    this.setState((prevState) => ({
      isMessageSendFormShowed: !prevState.isMessageSendFormShowed,
      isInfoBlockShowed: !prevState.isInfoBlockShowed,
    }));
    this.resetForm();
  }

  resetForm() {
    this.setState(this.baseState);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!this.canBeSubmitted()) {
      return;
    }

    const { messageSubject } = this.state;
    const {
      sentMessageInfo, sendForm, resetFormInStore, getMessageID,
    } = this.props;

    const sentDate = getDateAndMonth(new Date());
    sentMessageInfo(sentDate, messageSubject);

    sendForm();
    getMessageID();
    resetFormInStore();

    this.toggleInfoBlock();
  }

  render() {
    const {
      isMessageSendFormShowed,
      senderName,
      senderEmail,
      receiverName,
      receiverEmail,
      messageSubject,
      messageText,
      touched,
    } = this.state;

    const errors = validateForm(senderName, senderEmail, receiverName, receiverEmail, messageSubject, messageText);
    const isDisabled = Object.keys(errors).some((x) => errors[x]);

    const shouldDisplayInputError = (name) => {
      const hasError = errors[name];
      const shouldDisplay = touched[name];

      return hasError ? shouldDisplay : false;
    };

    return (
      <>
        {isMessageSendFormShowed
          ? (
            <MessageSendForm onSubmit={this.handleSubmit} encType="multipart/form-data">
              {sendFormConfig.inputs.map((input) => (
                <Fragment key={input.id}>
                  <Input
                    id={input.id}
                    type={input.type}
                    name={input.name}
                    label={input.label}
                    placeholder={input.placeholder}
                    onChange={this.handleInputChange}
                    onBlur={this.handleInputBlur}
                    inputHalfLeft={input.inputHalfLeft}
                    inputHalfRight={input.inputHalfRight}
                    value={this.state}
                    error={shouldDisplayInputError(input.name)}
                    errorMessage={input.errorMessage}
                  />
                </Fragment>
              ))}

              <Textarea
                id={sendFormConfig.textarea.id}
                name={sendFormConfig.textarea.name}
                label={sendFormConfig.textarea.label}
                placeholder={sendFormConfig.textarea.placeholder}
                value={this.state}
                onChange={this.handleInputChange}
                onBlur={this.handleInputBlur}
                error={shouldDisplayInputError(sendFormConfig.textarea.name)}
                errorMessage={sendFormConfig.textarea.errorMessage}
              />

              <FileAttachmentContainer />

              <Button
                type={sendFormConfig.submitButton.type}
                disabled={isDisabled}
                buttonText={sendFormConfig.submitButton.buttonText}
              />
            </MessageSendForm>
          )
          : (
            <InfoBlock
              infoBlockHeading={sendFormConfig.infoBlock.heading}
              infoBlockMessage={
                `Совсем скоро сообщение вылетит из сервера, и будет двигаться в сторону почты получателя
                 «${receiverEmail}»
                 со скоростью электронов.`
              }
              hideBlockOnTimer={this.toggleInfoBlock}
            />
          )}
      </>
    );
  }
}

MessageSendFormContainer.propTypes = {
  getInputVal: PropTypes.func,
  sentMessageInfo: PropTypes.func,
  sendForm: PropTypes.func,
  resetFormInStore: PropTypes.func,
  getMessageID: PropTypes.func,
};

MessageSendFormContainer.defaultProps = {
  getInputVal: () => { },
  sentMessageInfo: () => { },
  sendForm: () => { },
  resetFormInStore: () => { },
  getMessageID: () => { },
};

function mapDispatchToProps(dispatch) {
  return {
    getInputVal: (name, value) => dispatch(getInputValue(name, value)),
    sentMessageInfo: (date, subject) => dispatch(getSentMessageInfo(date, subject)),
    resetFormInStore: () => dispatch(resetFormState()),
    sendForm: () => dispatch(sendFilledForm()),
    getMessageID: () => dispatch(getSentMessageID()),
  };
}

export default connect(null, mapDispatchToProps)(MessageSendFormContainer);
