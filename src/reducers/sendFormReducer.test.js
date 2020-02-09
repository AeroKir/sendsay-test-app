import sendFormReducer from './sendFormReducer';
import initialState from '../store/initialState';
import {
  GET_INPUT_VALUE,
  GET_SENT_MESSAGE_INFO,
  STORE_ATTACHED_FILE,
  REMOVE_ATTACHED_FILE,
  RESET_FORM_STATE,
  GET_SENT_MESSAGE_ID,
  GET_SENT_MESSAGE_STATUS,
} from '../constants/actionTypes';

describe('Send form reducer', () => {
  /**
   * 'GET_INPUT_VALUE' case test
   */
  it('GET_INPUT_VALUE', () => {
    const senderNameValue = {
      type: GET_INPUT_VALUE,
      payload: {
        inputName: 'senderName',
        inputValue: 'Kirill',
      },
    };

    expect(sendFormReducer(initialState, senderNameValue)).toEqual({
      ...initialState,
      senderName: 'Kirill',
    });

    const senderEmailValue = {
      type: GET_INPUT_VALUE,
      payload: {
        inputName: 'senderEmail',
        inputValue: 'kirill@gmail.com',
      },
    };

    expect(sendFormReducer(initialState, senderEmailValue)).toEqual({
      ...initialState,
      senderEmail: 'kirill@gmail.com',
    });

    const receiverNameValue = {
      type: GET_INPUT_VALUE,
      payload: {
        inputName: 'receiverName',
        inputValue: 'Uncle Bob',
      },
    };

    expect(sendFormReducer(initialState, receiverNameValue)).toEqual({
      ...initialState,
      receiverName: 'Uncle Bob',
    });

    const receiverEmailValue = {
      type: GET_INPUT_VALUE,
      payload: {
        inputName: 'receiverEmail',
        inputValue: 'bob@uncle.com',
      },
    };

    expect(sendFormReducer(initialState, receiverEmailValue)).toEqual({
      ...initialState,
      receiverEmail: 'bob@uncle.com',
    });

    const messageSubjectValue = {
      type: GET_INPUT_VALUE,
      payload: {
        inputName: 'messageSubject',
        inputValue: 'Hello Bob!',
      },
    };

    expect(sendFormReducer(initialState, messageSubjectValue)).toEqual({
      ...initialState,
      messageSubject: 'Hello Bob!',
    });

    const messageTextValue = {
      type: GET_INPUT_VALUE,
      payload: {
        inputName: 'messageText',
        inputValue: 'How are you? I will follow you.',
      },
    };

    expect(sendFormReducer(initialState, messageTextValue)).toEqual({
      ...initialState,
      messageText: 'How are you? I will follow you.',
    });
  });

  /**
   * 'GET_SENT_MESSAGE_INFO' case test
   */
  it('GET_SENT_MESSAGE_INFO', () => {
    const sentMessageInfo = {
      type: GET_SENT_MESSAGE_INFO,
      payload: {
        sendingDate: '1 января',
        messageSubject: 'Hello Bob!',
      },
    };

    expect(sendFormReducer(initialState, sentMessageInfo)).toEqual({
      ...initialState,
      sendedMessages: [
        ...initialState.sendedMessages,
        {
          id: '',
          date: '1 января',
          subject: 'Hello Bob!',
          status: 'В очереди',
          statusValue: '',
        },
      ],
    });

    const anotherSentMessage = {
      type: GET_SENT_MESSAGE_INFO,
      payload: {
        sendingDate: '2 января',
        messageSubject: 'Useful things',
      },
    };

    expect(sendFormReducer(initialState, anotherSentMessage)).toEqual({
      ...initialState,
      sendedMessages: [
        ...initialState.sendedMessages,
        {
          id: '',
          date: '2 января',
          subject: 'Useful things',
          status: 'В очереди',
          statusValue: '',
        },
      ],
    });
  });

  /**
   * 'STORE_ATTACHED_FILE' case test
   */
  it('STORE_ATTACHED_FILE', () => {
    const attachedFile = {
      type: STORE_ATTACHED_FILE,
      payload: {
        name: 'my_document.doc',
        content: 'text',
      },
    };

    expect(sendFormReducer(initialState, attachedFile)).toEqual({
      ...initialState,
      attachedFiles: [
        ...initialState.attachedFiles,
        { name: 'my_document.doc', content: 'text', encoding: 'base64' },
      ],
    });
  });

  /**
   * 'REMOVE_ATTACHED_FILE' case test
   */
  it('REMOVE_ATTACHED_FILE', () => {
    const prevState = {
      attachedFiles: [
        { name: 'my_document.doc', content: 'text', encoding: 'base64' },
        { name: 'Very-interesting-book.pdf', content: 'text', encoding: 'base64' },
        { name: 'picture.jpg', content: 'image', encoding: 'base64' },
      ],
    };

    const removedFile = {
      type: REMOVE_ATTACHED_FILE,
      payload: { name: 'Very-interesting-book.pdf' },
    };

    expect(sendFormReducer(prevState, removedFile)).toEqual({
      ...prevState,
      attachedFiles: [
        { name: 'my_document.doc', content: 'text', encoding: 'base64' },
        { name: 'picture.jpg', content: 'image', encoding: 'base64' },
      ],
    });
  });

  /**
   * 'RESET_FORM_STATE' case test
   */
  it('RESET_FORM_STATE', () => {
    const filledState = {
      senderName: 'Kirill',
      senderEmail: 'kirill@gmail.com',
      receiverName: 'Uncle Bob',
      receiverEmail: 'bob@uncle.com',
      messageSubject: 'Hello Bob!',
      messageText: 'How are you? I will follow you.',
      attachedFiles: [
        { name: 'my_document.doc', content: 'text', encoding: 'base64' },
        { name: 'Very-interesting-book.pdf', content: 'text', encoding: 'base64' },
        { name: 'picture.jpg', content: 'image', encoding: 'base64' },
      ],
      sendedMessages: [
        {
          id: '',
          date: '1 января',
          subject: 'Hello Bob!',
          status: 'В очереди',
          statusValue: '',
        },
      ],
    };

    const resetState = {
      type: RESET_FORM_STATE,
    };

    expect(sendFormReducer(filledState, resetState)).toEqual({
      ...filledState,
      senderName: '',
      senderEmail: '',
      receiverName: '',
      receiverEmail: '',
      messageSubject: '',
      messageText: '',
      attachedFiles: [],
      sendedMessages: [
        {
          id: '',
          date: '1 января',
          subject: 'Hello Bob!',
          status: 'В очереди',
          statusValue: '',
        },
      ],
    });
  });

  /**
   * 'GET_SENT_MESSAGE_ID' case test
   */
  it('GET_SENT_MESSAGE_ID', () => {
    const sendedMessagesState = {
      sendedMessages: [
        {
          id: 1,
          date: '1 января',
          subject: 'Hello Bob!',
          status: 'В очереди',
          statusValue: '',
        },
        {
          id: '',
          date: '1 января',
          subject: 'Hello Bob!',
          status: 'В очереди',
          statusValue: '',
        },
      ],
    };

    const sentMessageId = {
      type: GET_SENT_MESSAGE_ID,
      payload: { id: 2 },
    };

    expect(sendFormReducer(sendedMessagesState, sentMessageId)).toEqual({
      ...sendedMessagesState,
      sendedMessages: [
        {
          id: 1,
          date: '1 января',
          subject: 'Hello Bob!',
          status: 'В очереди',
          statusValue: '',
        },
        {
          id: 2,
          date: '1 января',
          subject: 'Hello Bob!',
          status: 'В очереди',
          statusValue: '',
        },
      ],
    });
  });

  /**
   * 'GET_SENT_MESSAGE_STATUS' case test
   */
  it('GET_SENT_MESSAGE_STATUS', () => {
    const sendedMessagesState = {
      sendedMessages: [
        {
          id: 1,
          date: '1 января',
          subject: 'Hello Bob!',
          status: 'Отправлено',
          statusValue: -1,
        },
        {
          id: 2,
          date: '1 января',
          subject: 'Hello Dude!',
          status: 'В очереди',
          statusValue: '',
        },
        {
          id: 3,
          date: '1 января',
          subject: 'Hello Bill!',
          status: 'В очереди',
          statusValue: 0,
        },
      ],
    };

    const sentMessageId = {
      type: GET_SENT_MESSAGE_STATUS,
      payload: { id: 2, status: -2 },
    };

    expect(sendFormReducer(sendedMessagesState, sentMessageId)).toEqual({
      ...sendedMessagesState,
      sendedMessages: [
        {
          id: 1,
          date: '1 января',
          subject: 'Hello Bob!',
          status: 'Отправлено',
          statusValue: -1,
        },
        {
          id: 2,
          date: '1 января',
          subject: 'Hello Dude!',
          status: 'Ошибка',
          statusValue: -2,
        },
        {
          id: 3,
          date: '1 января',
          subject: 'Hello Bill!',
          status: 'В очереди',
          statusValue: 0,
        },
      ],
    });
  });
});
