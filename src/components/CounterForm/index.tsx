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
import type { ICounterData, ICounterInitialState } from '../../types';
import { parseStringToId } from '../../utils';
import styles from './styles.module.scss';

interface ICounterFormProps extends React.ComponentPropsWithoutRef<"form"> {
  dataSource: ICounterData[];
  onFormSubmit: (data: Pick<ICounterInitialState, 'startNumber' | 'nextNumber' | 'counterData'>) => void;
}

interface IFormState extends Record<string, number> {}

const COUNTER_START_NUMBER_ID = parseStringToId(COUNTER_START_NUMBER_TITLE);

function CounterFormComp({ dataSource, onFormSubmit }: ICounterFormProps): JSX.Element {
  const formRef = React.useRef<HTMLFormElement>(null!);
  const [formState, setFormState] = React.useState<IFormState>({});
  const [isInitCounter, setInitCounter] = React.useState<boolean>(false);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (isInitCounter) {
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
        onFormSubmit({
          startNumber,
          nextNumber,
          counterData: dataSource.map((data) => ({
            ...data,
            processingTime: formValues[data.id],
          }))
        });
        setFormState(formValues);
      }
    }
    setInitCounter(!isInitCounter)
  }

  return (
    <form ref={formRef} className={styles.form} onSubmit={handleSubmit}>
      <div>
        {dataSource.map(({ id, name }) => (
          <CounterInput
            key={id}
            id={`${id}`}
            title={name}
            disabled={!isInitCounter}
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
          disabled={!isInitCounter}
        />
        <Button type="submit">{BTN_INIT}</Button>
      </div>
    </form>
  )
}

export default CounterFormComp;
