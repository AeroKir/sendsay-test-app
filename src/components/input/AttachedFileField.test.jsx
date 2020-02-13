import React from 'react';
import { shallow } from 'enzyme';

import AttachedFileField from './AttachedFileField';

describe('Attached file field', () => {
  const attachedFileField = shallow(<AttachedFileField />);
  it('Attached file field is rendered', () => {
    expect(attachedFileField.find('.AttachedFileFieldWrapper')).toHaveLength(1);
    expect(attachedFileField.find('.AttachedFileField')).toHaveLength(1);
    expect(attachedFileField.find('.AttachedFileField-icon')).toHaveLength(1);
    expect(attachedFileField.find('.AttachedFileField-fileNameField')).toHaveLength(1);
    expect(attachedFileField.find('.AttachedFileField-button')).toHaveLength(1);
  });

  const attachedFileName = shallow(<AttachedFileField fileName="Very-interesting-book.pdf" />);
  it('The attached file name is showed', () => {
    expect(attachedFileName.find('span').props('fileName').children).toEqual('Very-interesting-book.pdf');
  });

  const onClickMock = jest.fn();
  const atacchedFileRemove = shallow(<AttachedFileField onClick={onClickMock} />);
  it('Remove file button is clicked', () => {
    atacchedFileRemove.find('.AttachedFileField-button').simulate('click');
    expect(onClickMock).toHaveBeenCalled();
  });
});
