import React from 'react';
import { shallow } from 'enzyme';

import Textarea from './Textarea';

describe('Textarea', () => {
  const textarea = shallow(<Textarea id="1" />);
  it('Textarea is rendered', () => {
    expect(textarea.find('.TextareaWrapper')).toHaveLength(1);
    expect(textarea.find('.Textarea-label')).toHaveLength(1);
    expect(textarea.find('.Textarea')).toHaveLength(1);
  });

  const textareaWithName = shallow(<Textarea id="2" name="textarea" />);
  it('Textarea has name property', () => {
    expect(textareaWithName.find('textarea').prop('name')).toEqual('textarea');
  });

  const onChangeMock = jest.fn();
  const onBlurMock = jest.fn();
  const textareaChange = shallow(<Textarea id="3" name="textarea" onChange={onChangeMock} onBlur={onBlurMock} />);
  it('Textarea onChange. Textarea onBlur', () => {
    textareaChange.find('textarea').simulate('change');
    expect(onChangeMock).toHaveBeenCalled();
    textareaChange.find('textarea').simulate('blur');
    expect(onBlurMock).toHaveBeenCalled();
  });

  const textareaWithError = shallow(<Textarea id="4" error errorMessage="Сообщение не может быть пустым" />);
  it('Textarea with error', () => {
    expect(textareaWithError.find('.is-error-textarea')).toHaveLength(1);
    expect(textareaWithError.find('span').props('errorMessage').children).toEqual('Сообщение не может быть пустым');
  });
});
