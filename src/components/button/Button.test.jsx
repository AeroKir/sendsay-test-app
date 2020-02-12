import React from 'react';
import { shallow } from 'enzyme';

import Button from './Button';

describe('Button', () => {
  const button = shallow(<Button buttonText="Отправить" />);
  it('Button is rendered', () => {
    expect(button.find('.Button')).toHaveLength(1);
    expect(button.props('buttonText').children).toEqual('Отправить');
  });

  const disabledButton = shallow(<Button disabled />);
  it('Button is disabled', () => {
    expect(disabledButton.find('.is-disabled')).toHaveLength(1);
  });

  const secondaryCenteredButton = shallow(<Button secondaryButton centered />);
  it('Secondary centered button', () => {
    expect(secondaryCenteredButton.find('.is-centered')).toHaveLength(1);
    expect(secondaryCenteredButton.find('.Button--secondary')).toHaveLength(1);
  });

  const onClickMock = jest.fn();
  const buttonClick = shallow(<Button onClick={onClickMock} />);
  it('Button is clicked', () => {
    buttonClick.find('button').simulate('click');
    expect(onClickMock).toHaveBeenCalled();
  });
});
