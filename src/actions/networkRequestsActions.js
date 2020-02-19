import { sendRequest, trackMessageDelivery } from '../services/sendsayAPI';
import { GET_SENT_MESSAGE_ID, GET_SENT_MESSAGE_STATUS } from '../constants/actionTypes';

export function getSentMessageID(id) {
  return {
    type: GET_SENT_MESSAGE_ID,
    payload: { id },
  };
}

export function sendFilledForm() {
  return (dispatch, getState) => {
    const state = getState().sendFormReducer;

    const mailRequestData = {
      action: 'issue.send.test',
      letter: {
        subject: state.messageSubject,
        'from.name': state.senderName,
        'from.email': state.senderEmail,
        'to.name': state.receiverName,
        message: { text: state.messageText },
        attaches: state.attachedFiles,
      },
      sendwhen: 'test',
      mca: [
        state.receiverEmail,
      ],
    };

    sendRequest(mailRequestData)
      .then((response) => response['track.id'])
      .then((id) => {
        const idToNumber = parseInt(id, 10);
        dispatch(getSentMessageID(idToNumber));
      })
      .catch((error) => error);
  };
}

export function getMessageStatus(id, status) {
  return {
    type: GET_SENT_MESSAGE_STATUS,
    payload: { id, status },
  };
}

export function requestDeliveryStatus(id) {
  return (dispatch) => {
    if (id) {
      trackMessageDelivery(id)
        .then((response) => {
          const idToNumber = parseInt(response.obj.id, 10);
          const statusToNumber = parseInt(response.obj.status, 10);
          dispatch(getMessageStatus(idToNumber, statusToNumber));
        })
        .catch((error) => error);
    }
  };
}
