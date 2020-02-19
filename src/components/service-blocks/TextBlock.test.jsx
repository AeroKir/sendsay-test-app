import React from 'react';
import { shallow } from 'enzyme';

import TextBlock from './TextBlock';

describe('Text block', () => {
  const textBlock = shallow(<TextBlock />);

  it('TextBlock is rendered', () => {
    expect(textBlock.find('.TextBlock')).toHaveLength(1);
  });
});
