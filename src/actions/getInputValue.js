import { GET_INPUT_VALUE } from '../constants/actionTypes';

function getInputValue(inputName, inputValue) {
  return {
    type: GET_INPUT_VALUE,
    payload: {
      inputName,
      inputValue,
    },
  };
}

export default getInputValue;
