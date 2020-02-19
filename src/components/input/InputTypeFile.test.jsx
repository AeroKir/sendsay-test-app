import React from 'react';
import { shallow } from 'enzyme';

import InputTypeFile from './InputTypeFile';

describe('Input type="file"', () => {
  const inputTypeFile = shallow(<InputTypeFile id="1" />);
  it('InputTypeFile is rendered', () => {
    expect(inputTypeFile.find('.InputTypeFileWrapper')).toHaveLength(1);
    expect(inputTypeFile.find('.InputTypeFile')).toHaveLength(1);
    expect(inputTypeFile.find('.InputTypeFile-label')).toHaveLength(1);
  });

  const inputTypeFileWithoutLabel = shallow(<InputTypeFile id="2" withoutLabel />);
  it('InputTypeFile without label', () => {
    expect(inputTypeFileWithoutLabel.find('.InputTypeFile-withoutLabel')).toHaveLength(1);
  });

  const onChangeMock = jest.fn();
  const onFocusMock = jest.fn();
  const onClickMock = jest.fn();
  const inputChange = shallow(
    <InputTypeFile
      id="3"
      onChange={onChangeMock}
      onFocus={onFocusMock}
      onClick={onClickMock}
    />,
  );
  it('InputTypeFile onChange. InputTypeFile onFocus. InputTypeFile onClick', () => {
    inputChange.find('input').simulate('change');
    expect(onChangeMock).toHaveBeenCalled();
    inputChange.find('input').simulate('focus');
    expect(onFocusMock).toHaveBeenCalled();
    inputChange.find('input').simulate('click');
    expect(onClickMock).toHaveBeenCalled();
  });
});
