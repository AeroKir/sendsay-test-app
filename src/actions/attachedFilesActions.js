import { STORE_ATTACHED_FILE, REMOVE_ATTACHED_FILE } from '../constants/actionTypes';

export function storeAttachedFile(name, content) {
  return {
    type: STORE_ATTACHED_FILE,
    payload: { name, content },
  };
}

export function removeAttachedFile(name) {
  return {
    type: REMOVE_ATTACHED_FILE,
    payload: { name },
  };
}
