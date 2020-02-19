import React from 'react';
import { shallow } from 'enzyme';

import ExtraContentBlock from './ExtraContentBlock';

describe('Extra content block', () => {
  const extraContentBlock = shallow(<ExtraContentBlock />);

  it('ExtraContentBlock is rendered', () => {
    expect(extraContentBlock.find('.ExtraContentBlock')).toHaveLength(1);
  });
});
