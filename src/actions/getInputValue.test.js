import getInputValue from './getInputValue';
import { GET_INPUT_VALUE } from '../constants/actionTypes';

it('getInputValue(): should create an action to get user input values', () => {
  const expectedSenderName = {
    type: GET_INPUT_VALUE,
    payload: {
      inputName: 'senderName',
      inputValue: 'Kirill',
    },
  };

  const expectedSenderEmail = {
    type: GET_INPUT_VALUE,
    payload: {
      inputName: 'senderEmail',
      inputValue: 'kirill@gmail.com',
    },
  };

  const expectedReceiverName = {
    type: GET_INPUT_VALUE,
    payload: {
      inputName: 'receiverName',
      inputValue: 'Uncle Bob',
    },
  };

  const expectedReceiverEmail = {
    type: GET_INPUT_VALUE,
    payload: {
      inputName: 'receiverEmail',
      inputValue: 'bob@uncle.com',
    },
  };

  const expectedMessageSubject = {
    type: GET_INPUT_VALUE,
    payload: {
      inputName: 'messageSubject',
      inputValue: 'Hello Bob!',
    },
  };

  const expectedMessageText = {
    type: GET_INPUT_VALUE,
    payload: {
      inputName: 'messageText',
      inputValue: 'How are you? I will follow you.',
    },
  };

  expect(getInputValue('senderName', 'Kirill')).toEqual(expectedSenderName);
  expect(getInputValue('senderEmail', 'kirill@gmail.com')).toEqual(expectedSenderEmail);
  expect(getInputValue('receiverName', 'Uncle Bob')).toEqual(expectedReceiverName);
  expect(getInputValue('receiverEmail', 'bob@uncle.com')).toEqual(expectedReceiverEmail);
  expect(getInputValue('messageSubject', 'Hello Bob!')).toEqual(expectedMessageSubject);
  expect(getInputValue('messageText', 'How are you? I will follow you.')).toEqual(expectedMessageText);
});
