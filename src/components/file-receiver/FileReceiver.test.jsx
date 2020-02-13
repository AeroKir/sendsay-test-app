import React from 'react';
import { shallow } from 'enzyme';

import FileReceiver from './FileReceiver';

describe('File receiver', () => {
  const fileReceiver = shallow(<FileReceiver />);
  it('FileReceive is rendered', () => {
    expect(fileReceiver.find('.FileReceiver')).toHaveLength(1);
    expect(fileReceiver.find('.FileReceiver-dragZone')).toHaveLength(1);
    expect(fileReceiver.find('.FileReceiver-content')).toHaveLength(1);
    expect(fileReceiver.find('.FileReceiver-mainHeading')).toHaveLength(1);
    expect(fileReceiver.find('.FileReceiver-explanation')).toHaveLength(1);
  });

  const onDragOverMock = jest.fn();
  const onDragLeaveMock = jest.fn();
  const onDropMock = jest.fn();
  const onChangeMock = jest.fn();
  const onClickMock = jest.fn();
  const onKeyPressMock = jest.fn();

  const fileReceiverWithEvents = shallow(
    <FileReceiver
      onDragOver={onDragOverMock}
      onDragLeave={onDragLeaveMock}
      onDrop={onDropMock}
      onChange={onChangeMock}
      onClick={onClickMock}
      onKeyPress={onKeyPressMock}
      dragOver
    />,
  );

  it('FileReceiver events', () => {
    fileReceiverWithEvents.find('.FileReceiver-dragZone').simulate('dragover');
    expect(fileReceiverWithEvents.find('.is-dragOver')).toHaveLength(1);

    fileReceiverWithEvents.find('.FileReceiver-dragZone').simulate('dragleave');
    expect(onDragLeaveMock).toHaveBeenCalled();

    fileReceiverWithEvents.find('.FileReceiver-dragZone').simulate('drop');
    expect(onDropMock).toHaveBeenCalled();

    fileReceiverWithEvents.find('.FileReceiver-dragZone').simulate('change');
    expect(onChangeMock).toHaveBeenCalled();

    fileReceiverWithEvents.find('.FileReceiver-dragZone').simulate('click');
    expect(onClickMock).toHaveBeenCalled();

    fileReceiverWithEvents.find('.FileReceiver-dragZone').simulate('keypress');
    expect(onKeyPressMock).toHaveBeenCalled();
  });
});
