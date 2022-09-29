import { useContext } from 'react';
import Button from '../Button';
import { BTN_NEXT } from '../../constants';
import CounterContext, { ICounterContext } from '../../contexts/CounterContext';
import { getNewTasks } from '../../utils/counter';

function AddMoreTasksComp(): JSX.Element {
  const { counterState, setCounterState } = useContext<ICounterContext>(CounterContext);
  const { nextNumber: prevNumber } = counterState;

  const onAddPeople = () => {
    const nextNumber = prevNumber + 1;
    const { tasks, lastTask } = getNewTasks({
      ...counterState, nextNumber
    });
    setCounterState({
      ...counterState,
      nextNumber,
      tasks,
      lastTask,
    });
  };

  return (
    <Button primary onClick={onAddPeople}>
      {`${BTN_NEXT} ${counterState.nextNumber}`}
    </Button>
  )
}

export default AddMoreTasksComp;
