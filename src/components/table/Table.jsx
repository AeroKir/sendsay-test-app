import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import generateKey from '../../utilities/generateKey';

import './Table.css';

function Table({ data, className }) {
  const classes = classNames(
    'Table',
    className,
  );

  return (
    <table className={classes}>
      <thead>
        <tr className="Table-rowHeading">
          <th className="Table-cell Table-cellHeading">Дата</th>
          <th className="Table-cell Table-cellHeading">Тема</th>
          <th className="Table-cell Table-cellHeading">Статус</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr className="Table-row" key={generateKey()}>
            <td className="Table-cell">{item.date}</td>
            <td className="Table-cell">
              <span className="Table-cellMessageTheme">{item.subject}</span>
            </td>
            <td className="Table-cell Table-cellStatus">
              {item.statusValue > -1 && <span className="is-waiting">{item.status}</span>}
              {item.statusValue < -1 && <span className="is-error">{item.status}</span>}
              {item.statusValue === -1 && <span className="is-success">{item.status}</span>}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string,
    subject: PropTypes.string,
    status: PropTypes.string,
  })),
  className: PropTypes.string,
};

Table.defaultProps = {
  data: [{
    date: '',
    subject: '',
    status: '',
  }],
  className: '',
};

export default Table;
