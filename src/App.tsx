import React from 'react';
import Container from './components/Container';
import CounterTable from './components/CounterTable';
import CounterForm from './components/CounterForm';
import PeopleWaiting from './components/PeopleWaiting';
import AddMoreTasks from './components/AddMoreTasks';
import {
  calculateTasksProcessingTime,
} from './utils/counter';
import CounterContext, { ICounterContext } from './contexts/CounterContext';
import type { ICounterData } from './types';
import styles from './App.module.scss';

function App(): JSX.Element {
  const { counterState, setCounterState } = React.useContext<ICounterContext>(CounterContext);
  const idleCounters = counterState.counterData.filter((data: ICounterData) => !data.processingTask);
  const idleCountersLength = idleCounters.length;
  const countersLength = counterState.counterData.length;
  const tasksLength = counterState.tasks.length;
  const isNothingToProcess = !tasksLength && idleCountersLength === countersLength;

  React.useEffect(() => {
    let timerId: any;
    timerId = setTimeout(() => {
      if (isNothingToProcess) clearTimeout(timerId)
      else {
        setCounterState({
          ...counterState,
          ...calculateTasksProcessingTime(counterState),
        });
      }
    }, 1000);

    return () => clearTimeout(timerId);
  }, [isNothingToProcess, counterState, setCounterState])
  
  return (
    <Container className={styles.container}>
      <CounterTable />
      <div className={styles.tableActions}>
        <PeopleWaiting />
        <AddMoreTasks />
      </div>
      <CounterForm />
    </Container>
  );
}

export default App;
