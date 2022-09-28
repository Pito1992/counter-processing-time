import React from 'react';
import CounterInput from '../CounterInput';
import Button from '../Button';
import {
  COUNTER_START_NUMBER_TITLE,
  COUNTER_START_NUMBER_DEFAULT_VALUE,
  BTN_INIT
} from '../../constants';
import type { ICounterData } from '../../types';
import styles from './styles.module.scss';

interface ICounterFormProps extends React.ComponentPropsWithoutRef<"form"> {
  dataSource: ICounterData[],
}

function CounterFormComp({ dataSource }: ICounterFormProps): JSX.Element {
  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div>
        {dataSource.map(({ id, name }) => (
          <CounterInput key={id} title={name} />
        ))}
        <br />
        <CounterInput
          title={COUNTER_START_NUMBER_TITLE}
          defaultValue={COUNTER_START_NUMBER_DEFAULT_VALUE}
        />
        <Button type="submit">{BTN_INIT}</Button>
      </div>
    </form>
  )
}

export default CounterFormComp;
