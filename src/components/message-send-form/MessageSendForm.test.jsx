import React from 'react';
import { shallow } from 'enzyme';

import MessageSendForm from './MessageSendForm';

describe('Message send form', () => {
  const onSubmitMock = jest.fn();

  const messageSendForm = shallow(
    <MessageSendForm onSubmit={onSubmitMock}>
      <input type="text" />
      <button type="submit">Submit</button>
    </MessageSendForm>,
  );

  it('MessageSendForm is rendered and can be submitted', () => {
    expect(messageSendForm.find('.MessageSendForm')).toHaveLength(1);
    expect(messageSendForm.find('.MessageSendForm-mainHeading')).toHaveLength(1);
    expect(messageSendForm.find('.MessageSendForm').childAt(1).type()).toEqual('input');
    expect(messageSendForm.find('.MessageSendForm').childAt(2).type()).toEqual('button');

    messageSendForm.find('.MessageSendForm').simulate('submit');
    expect(onSubmitMock).toHaveBeenCalled();
  });
});
