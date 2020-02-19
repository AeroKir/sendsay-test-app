import { GET_SENT_MESSAGE_INFO } from '../constants/actionTypes';

function getSentMessageInfo(sendingDate, messageSubject) {
  return {
    type: GET_SENT_MESSAGE_INFO,
    payload: { sendingDate, messageSubject },
  };
}

export default getSentMessageInfo;
