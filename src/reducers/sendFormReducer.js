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

function sendFormReducer(state = initialState, action) {
  switch (action.type) {
    case GET_INPUT_VALUE:
    {
      const obj = Object.keys(state);
      const newState = state;

      for (let i = 0; i < obj.length; i += 1) {
        if (obj[i] === action.payload.inputName) {
          newState[obj[i]] = action.payload.inputValue;
          return state;
        }
      }

      return { ...state, newState };
    }

    case STORE_ATTACHED_FILE:
    {
      return {
        ...state,
        attachedFiles: [
          ...state.attachedFiles,
          { name: action.payload.name, content: action.payload.content, encoding: 'base64' },
        ],
      };
    }

    case REMOVE_ATTACHED_FILE:
    {
      return {
        ...state,
        attachedFiles: state.attachedFiles.filter((item) => item.name !== action.payload.name),
      };
    }

    case RESET_FORM_STATE:
    {
      return {
        senderName: '',
        senderEmail: '',
        receiverName: '',
        receiverEmail: '',
        messageSubject: '',
        messageText: '',
        attachedFiles: [],
        sendedMessages: [...state.sendedMessages],
      };
    }

    case GET_SENT_MESSAGE_INFO:
    {
      return {
        ...state,
        sendedMessages: [
          ...state.sendedMessages,
          {
            id: '',
            date: action.payload.sendingDate,
            subject: action.payload.messageSubject,
            status: 'В очереди',
            statusValue: '',
          },
        ],
      };
    }

    case GET_SENT_MESSAGE_ID:
    {
      const messagesWithID = state.sendedMessages.map((message) => {
        if (!message.id) {
          return { ...message, id: action.payload.id };
        }
        return { ...message };
      });

      return {
        ...state,
        sendedMessages: messagesWithID,
      };
    }

    case GET_SENT_MESSAGE_STATUS:
    {
      const messagesWithStatus = state.sendedMessages.map((message) => {
        if (message.id === action.payload.id) {
          if (action.payload.status === -1) {
            return { ...message, status: 'Отправлено', statusValue: action.payload.status };
          }
          if (action.payload.status < -1) {
            return { ...message, status: 'Ошибка', statusValue: action.payload.status };
          }
          if (action.payload.status > -1) {
            return { ...message, status: 'В очереди', statusValue: action.payload.status };
          }
        }

        return { ...message };
      });

      return {
        ...state,
        sendedMessages: messagesWithStatus,
      };
    }

    default:
      return state;
  }
}

export default sendFormReducer;
