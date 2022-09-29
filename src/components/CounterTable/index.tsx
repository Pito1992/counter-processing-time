import React from 'react';
import { PROCESSING_IDLE, COUNTER, PROCESSING, PROCESSED } from '../../constants';
import CounterContext, { ICounterContext } from '../../contexts/CounterContext';
import styles from './styles.module.scss';

interface ICounterTableProps extends React.ComponentPropsWithoutRef<"table"> {}

function CounterTableComp(props: ICounterTableProps): JSX.Element {
  const { counterState } = React.useContext<ICounterContext>(CounterContext);
  const { counterData } = counterState;

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
        {counterData.map(({ id, name, processingTask, processedTasks }) => (
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
