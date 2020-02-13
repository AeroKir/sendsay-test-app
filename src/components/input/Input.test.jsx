import React from 'react';
import { shallow } from 'enzyme';

import Input from './Input';

describe('Input', () => {
  const input = shallow(<Input id="1" type="text" />);
  it('Input is rendered', () => {
    expect(input.find('.InputWrapper')).toHaveLength(1);
    expect(input.find('.Input')).toHaveLength(1);
    expect(input.find('.Input-label')).toHaveLength(1);
  });

  const inputWithName = shallow(<Input id="2" type="text" name="senderName" />);
  it('Input has name property', () => {
    expect(inputWithName.find('input').prop('name')).toEqual('senderName');
  });

  const onChangeMock = jest.fn();
  const onBlurMock = jest.fn();
  const inputChange = shallow(<Input id="3" type="text" name="senderName" onChange={onChangeMock} onBlur={onBlurMock} />);
  it('Input onChange. Input onBlur', () => {
    inputChange.find('input').simulate('change');
    expect(onChangeMock).toHaveBeenCalled();
    inputChange.find('input').simulate('blur');
    expect(onBlurMock).toHaveBeenCalled();
  });

  const inputWithError = shallow(<Input Input id="4" type="text" error errorMessage="Поле не может быть пустым" />);
  it('Input with error', () => {
    expect(inputWithError.find('.is-error')).toHaveLength(1);
    expect(inputWithError.find('span').props('errorMessage').children).toEqual('Поле не может быть пустым');
  });
});
