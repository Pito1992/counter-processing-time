import React from 'react';
import { PROCESSING_IDLE, COUNTER, PROCESSING, PROCESSED } from '../../constants';
import type { ICounterData } from '../../types';
import styles from './styles.module.scss';

interface ICounterTableProps extends React.ComponentPropsWithoutRef<"table"> {
  dataSource: ICounterData[],
}

function CounterTableComp({ dataSource }: ICounterTableProps): JSX.Element {
  return (
    <table className={styles.table}>
      <tr>
        <th>{COUNTER}</th>
        <th>{PROCESSING}</th>
        <th>{PROCESSED}</th>
      </tr>
      {dataSource.map(({ id, name, processing, processed }) => (
        <tr key={id}>
          <td>{name}</td>
          <td>{processing || PROCESSING_IDLE}</td>
          <td>{processed || ''}</td>
        </tr>
      ))}
    </table>
  )
}

export default CounterTableComp;
