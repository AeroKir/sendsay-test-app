import React from 'react';
import { shallow } from 'enzyme';

import InfoBlock from './InfoBlock';

describe('Info block', () => {
  const infoBlock = shallow(<InfoBlock />);

  it('IfoBlock is rendered', () => {
    expect(infoBlock.find('.InfoBlock')).toHaveLength(1);
    expect(infoBlock.find('.InfoBlock-content')).toHaveLength(1);
    expect(infoBlock.find('.InfoBlock-mainHeading')).toHaveLength(1);
    expect(infoBlock.find('.InfoBlock-message')).toHaveLength(1);
  });

  const infoBlockWithIcon = shallow(<InfoBlock showIcon />);
  it('IfoBlock with icon', () => {
    expect(infoBlockWithIcon.find('.is-showed')).toHaveLength(1);
  });

  const infoBlockWithFooterContent = shallow(
    <InfoBlock
      footerContent={<button type="button">Close</button>}
    />,
  );
  it('IfoBlock with footer', () => {
    expect(infoBlockWithFooterContent.find('.InfoBlock-footer')).toHaveLength(1);
  });
});
