import React from 'react';
import { NUMBER_OF_PEOPLE_WAITING } from '../../constants';
import CounterContext, { ICounterContext } from '../../contexts/CounterContext';
import type { ICounterData } from '../../types';
import styles from './styles.module.scss';

interface IPeopleWaitingProps extends React.ComponentPropsWithoutRef<"div"> {}

function PeopleWaitingComp({ className, ...restProps }: IPeopleWaitingProps): JSX.Element {
  const { counterState } = React.useContext<ICounterContext>(CounterContext);
  const { counterData, tasks } = counterState;
  const idleCounters = counterData.filter((data: ICounterData) => !data.processingTask);
  const peopleWaiting = idleCounters.length === 0 ? tasks.length : 0;

  return (
    <div className={styles.container} {...restProps}>
      {NUMBER_OF_PEOPLE_WAITING}: {peopleWaiting}
    </div>
  );
}

export default PeopleWaitingComp;