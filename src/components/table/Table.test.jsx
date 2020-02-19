import React from 'react';
import { shallow } from 'enzyme';

import Table from './Table';

describe('Table', () => {
  const testData = [
    {
      date: '1 января',
      subject: 'Тема письма',
      status: 'В очереди',
      statusValue: 0,
    },
  ];
  const table = shallow(<Table data={testData} />);

  it('Table is rendered with data', () => {
    expect(table.find('.Table')).toHaveLength(1);
    expect(table.find('.Table-rowHeading')).toHaveLength(1);
    expect(table.find('.Table-cellHeading')).toHaveLength(3);
    expect(table.find('.Table-row')).toHaveLength(1);
    expect(table.find('.is-waiting')).toHaveLength(1);
    expect(table.find('.Table-row').childAt(0).text()).toEqual('1 января');
    expect(table.find('.Table-cellMessageTheme').text()).toEqual('Тема письма');
    expect(table.find('.Table-cellStatus').text()).toEqual('В очереди');
  });
});
