import getSentMessageInfo from './getSentMessageInfo';
import { GET_SENT_MESSAGE_INFO } from '../constants/actionTypes';

it('getSentMessageInfo(): should create an action to get sent message date and subject value', () => {
  const expectedAction = {
    type: GET_SENT_MESSAGE_INFO,
    payload: {
      sendingDate: '1 января',
      messageSubject: 'Happy New Year',
    },
  };

  expect(getSentMessageInfo('1 января', 'Happy New Year')).toEqual(expectedAction);
});
