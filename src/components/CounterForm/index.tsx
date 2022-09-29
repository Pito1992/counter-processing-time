import React from 'react';
import CounterInput from '../CounterInput';
import Button from '../Button';
import {
  COUNTER_START_NUMBER_TITLE,
  COUNTER_START_NUMBER_DEFAULT_VALUE,
  COUNTER_PROCESSING_TIME_DEFAULT_VALUE,
  COUNTER_PROCESSING_TIME,
  BTN_INIT
} from '../../constants';
import { parseStringToId } from '../../utils';
import CounterContext, { ICounterContext } from '../../contexts/CounterContext';
import { getNewTasks } from '../../utils/counter';
import styles from './styles.module.scss';

interface ICounterFormProps extends React.ComponentPropsWithoutRef<"form"> {}

interface IFormState extends Record<string, number> {}

const COUNTER_START_NUMBER_ID = parseStringToId(COUNTER_START_NUMBER_TITLE);

function CounterFormComp(props: ICounterFormProps): JSX.Element {
  const { counterState, setCounterState } = React.useContext<ICounterContext>(CounterContext);
  const { counterData } = counterState;

  const formRef = React.useRef<HTMLFormElement>(null!);
  const [formState, setFormState] = React.useState<IFormState>({});
  const [isFormEnable, toggleForm] = React.useState<boolean>(false);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (isFormEnable) {
      const eventTarget = e.target as HTMLFormElement
      const formValues: IFormState = {};
      for (let i = 0; i < eventTarget.length; i++) {
        const element = eventTarget[i];
        if (element instanceof HTMLInputElement) {
          const { id, value } = element;
          formValues[id] = +value;
        }
      }
  
      if (JSON.stringify(formValues) !== JSON.stringify(formState)) {
        const startNumber = formValues[COUNTER_START_NUMBER_ID];
        const nextNumber = startNumber === COUNTER_START_NUMBER_DEFAULT_VALUE ? startNumber : startNumber + 1;
        const { tasks, lastTask } = getNewTasks({
          ...counterState, nextNumber
        })
        const newCounterData = counterData.map((data) => ({
          ...data,
          processingTime: formValues[data.id],
        }))
        setCounterState({
          ...counterState,
          startNumber,
          nextNumber,
          counterData: newCounterData,
          tasks,
          lastTask,
        });
        setFormState(formValues);
      }
    }
    toggleForm(!isFormEnable)
  }

  return (
    <form ref={formRef} className={styles.form} onSubmit={handleSubmit}>
      <div>
        {counterData.map(({ id, name }) => (
          <CounterInput
            key={id}
            id={`${id}`}
            title={name}
            disabled={!isFormEnable}
            defaultValue={COUNTER_PROCESSING_TIME_DEFAULT_VALUE}
            min={COUNTER_PROCESSING_TIME.MIN}
            max={COUNTER_PROCESSING_TIME.MAX}
          />
        ))}
        <br />
        <CounterInput
          id={COUNTER_START_NUMBER_ID}
          title={COUNTER_START_NUMBER_TITLE}
          defaultValue={COUNTER_START_NUMBER_DEFAULT_VALUE}
          disabled={!isFormEnable}
        />
        <Button type="submit">{BTN_INIT}</Button>
      </div>
    </form>
  )
}

export default CounterFormComp;
