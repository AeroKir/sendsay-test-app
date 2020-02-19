import { storeAttachedFile, removeAttachedFile } from './attachedFilesActions';
import { STORE_ATTACHED_FILE, REMOVE_ATTACHED_FILE } from '../constants/actionTypes';

it('storeAttachedFile(): should create an action to store attached file in state', () => {
  const expectedAction = {
    type: STORE_ATTACHED_FILE,
    payload: {
      name: 'Very-interesting-book.pdf',
      content: 'text',
    },
  };

  expect(storeAttachedFile('Very-interesting-book.pdf', 'text')).toEqual(expectedAction);
});

it('removeAttachedFile(): should create an action to remove attached file from state', () => {
  const expectedAction = {
    type: REMOVE_ATTACHED_FILE,
    payload: {
      name: 'Very-interesting-book.pdf',
    },
  };

  expect(removeAttachedFile('Very-interesting-book.pdf')).toEqual(expectedAction);
});
