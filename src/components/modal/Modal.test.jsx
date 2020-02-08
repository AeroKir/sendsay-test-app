import React from 'react';
import { shallow } from 'enzyme';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Modal from './Modal';

// let container = null;

// beforeEach(() => {
//   container = document.createElement('div');
//   document.body.appendChild(container);
// });

// afterEach(() => {
//   unmountComponentAtNode(container);
//   container.remove();
//   container = null;
// });

describe('Modal window', () => {
  const props = {
    isOpen: false,
    className: '',
    modalHeading: '',
    modalContent: '',
    onCancel: () => { },
    onSubmit: () => { },
    children: null,
  };

  describe('Modal window not shown', () => {
    const modal = shallow(<Modal {...props} />);

    it('Modal is not rendered', () => {
      expect(modal.find('div')).toHaveLength(0);
      expect(modal.find('.Modal')).toHaveLength(0);
      expect(modal.find('.ModalInner')).toHaveLength(0);
    });
  });

  describe('Modal window is shown', () => {
    const nextProps = {
      ...props,
      isOpen: true,
    };

    const modal = shallow(<Modal {...nextProps} />);

    it('Modal is rendered', () => {
      expect(modal.find('.Modal')).toHaveLength(1);
      expect(modal.find('.ModalInner')).toHaveLength(1);
      expect(modal.find('.Modal-heading')).toHaveLength(1);
      expect(modal.find('.Modal-content')).toHaveLength(1);
      expect(modal.find('.Modal-footer')).toHaveLength(1);
      expect(modal.find('.Modal-button')).toHaveLength(2);
      expect(modal.find('.Modal-button--cancel')).toHaveLength(1);
      expect(modal.find('.Modal-button--confirm')).toHaveLength(1);
    });
  });

  describe('On cancel action was invoked `onCancel()` method', () => {
    const onCancelMock = jest.fn();

    const nextProps = {
      ...props,
      isOpen: true,
      onCancel: onCancelMock,
    };

    const modal = shallow(<Modal {...nextProps} />);

    it('Cancel button is pressed', () => {
      modal.find('.Modal-button--cancel').simulate('click');
      expect(onCancelMock).toHaveBeenCalled();
    });
  });

  describe('On submit action was invoked `onSubmit()` method', () => {
    const onSubmitMock = jest.fn();

    const nextProps = {
      ...props,
      isOpen: true,
      onSubmit: onSubmitMock,
    };

    const modal = shallow(<Modal {...nextProps} />);

    it('Submit button is pressed', () => {
      modal.find('.Modal-button--confirm').simulate('click');
      expect(onSubmitMock).toHaveBeenCalled();
    });
  });
});
