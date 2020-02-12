import React from 'react';
import { shallow } from 'enzyme';

import Icon from './Icon';

describe('Icon', () => {
  const icon = shallow(<Icon src="./icons/icon.svg" alt="Icon" />);
  it('Icon is rendered', () => {
    expect(icon.find('.Icon--default')).toHaveLength(1);
    expect(icon.prop('src')).toEqual('./icons/icon.svg');
    expect(icon.prop('alt')).toEqual('Icon');
  });
});
