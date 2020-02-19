import resetFormState from './resetFormState';
import { RESET_FORM_STATE } from '../constants/actionTypes';

it('resetFormState(): should create an action for reset redux state', () => {
  const expectedAction = {
    type: RESET_FORM_STATE,
  };

  expect(resetFormState()).toEqual(expectedAction);
});
