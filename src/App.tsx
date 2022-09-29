import React from 'react';
import Container from './components/Container';
import CounterTable from './components/CounterTable';
import CounterForm from './components/CounterForm';
import PeopleWaiting from './components/PeopleWaiting';
import Button from './components/Button';
import {
  BTN_NEXT, COUNTER_START_NUMBER_DEFAULT_VALUE,
  COUNTER_NEXT_NUMBER_DEFAULT_VALUE,
  COUNTER_PROCESSING_TIME_DEFAULT_VALUE
} from './constants';
import {
  handleProcessingTask,
  handleProcessedTasks
} from './utils/counter';
import type { ICounterInitialState } from './types';
import styles from './App.module.scss';

const initialState: ICounterInitialState = {
  counterData: [{
    id: 1,
    name: 'Tony',
    processingTask: 0,
    processingTime: COUNTER_PROCESSING_TIME_DEFAULT_VALUE,
    processedTasks: [],
  }, {
    id: 2,
    name: 'Jerry',
    processingTask: 0,
    processingTime: COUNTER_PROCESSING_TIME_DEFAULT_VALUE,
    processedTasks: [],
  }, {
    id: 3,
    name: 'Elenore',
    processingTask: 0,
    processingTime: COUNTER_PROCESSING_TIME_DEFAULT_VALUE,
    processedTasks: [],
  }, {
    id: 4,
    name: 'Natasha',
    processingTask: 0,
    processingTime: COUNTER_PROCESSING_TIME_DEFAULT_VALUE,
    processedTasks: [],
  }],
  startNumber: COUNTER_START_NUMBER_DEFAULT_VALUE,
  nextNumber: COUNTER_NEXT_NUMBER_DEFAULT_VALUE,
  tasks: [],
  lastTask: 0,
}

function App(): JSX.Element {
  const [state, setState] = React.useState<ICounterInitialState>(initialState);
  const idleCounters = state.counterData.filter((data) => !data.processingTask);
  const idleCountersLength = idleCounters.length;
  const countersLength = state.counterData.length;
  const tasksLength = state.tasks.length;
  const peopleWaiting = idleCountersLength === 0 ? tasksLength : 0;
  const isNothingToProcess = !tasksLength && idleCountersLength === countersLength;

  const onSubmit = (newState: Pick<ICounterInitialState, 'startNumber'>) =>{
    setState({
      ...state,
      ...newState,
    });
  }

  const onAddPeople = React.useCallback(() => {
    setState(prevState => {
      return {
        ...prevState,
        nextNumber: prevState.nextNumber + 1,
      }
    });
  }, []);
  
  function mainThread() {
    const { counterData, tasks } = state;
    const tempTasks = [...tasks];
    const tempCounterData = [...counterData];
    let i = 0;
    let j = 0;
    while (i < countersLength) {
      const task = tempTasks[j];
      const counter = tempCounterData[i];
      
      if (!counter.processingTask && task) {
        tempCounterData[i] = handleProcessingTask(counter, task)
        tempTasks[j++] = 0;
      }
      if (counter.processingTask) {
        const isProcessingTaskCompleted = counter.taskProcessing.next().value;
        if (isProcessingTaskCompleted) {
          tempCounterData[i] = handleProcessedTasks(counter, task)
          tempTasks[j++] = 0;
        }
      }
      i++;
    }
    setState({
      ...state,
      tasks: tempTasks.filter((task) => task),
      counterData: tempCounterData,
    });
  }

  function handleTaskNew() {
    const { nextNumber, tasks, lastTask } = state;
    const tempTasks = [...tasks];
    let i = lastTask;
    while (++i < nextNumber) {
      tempTasks.push(i);
    }
    return {
      tasks: tempTasks,
      lastTask: tempTasks[tempTasks.length - 1] || lastTask,
    }
  }

  React.useEffect(() => {
    let timerId: any;
    timerId = setTimeout(() => {
      if (isNothingToProcess) clearTimeout(timerId)
      else mainThread();
    }, 1000);

    return () => clearTimeout(timerId);
  }, [isNothingToProcess, state])

  React.useEffect(() => {
    const { tasks, lastTask } = handleTaskNew();
    setState({
      ...state,
      tasks, lastTask
    })
  }, [state.nextNumber])
  
  
  return (
    <Container className={styles.container}>
      <CounterTable dataSource={state.counterData} />
      <div className={styles.tableActions}>
        <PeopleWaiting value={peopleWaiting} />
        <Button primary onClick={onAddPeople}>
          {`${BTN_NEXT} ${state.nextNumber}`}
        </Button>
      </div>
      <CounterForm dataSource={state.counterData} onFormSubmit={onSubmit} />
    </Container>
  );
}

export default App;
