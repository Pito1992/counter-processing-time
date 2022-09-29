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
      <thead>
        <tr>
          <th>{COUNTER}</th>
          <th>{PROCESSING}</th>
          <th>{PROCESSED}</th>
        </tr>
      </thead>
      <tbody>
        {dataSource.map(({ id, name, processingTask, processedTasks }) => (
          <tr key={id}>
            <td>{name}</td>
            <td>{processingTask || PROCESSING_IDLE}</td>
            <td>{processedTasks.join(',')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default CounterTableComp;
