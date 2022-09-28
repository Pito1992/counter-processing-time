import React from 'react';
import { COUNTER_DEFAULT_VALUE } from '../../constants';
import styles from './styles.module.scss';

interface ICounterInputProps extends React.ComponentPropsWithoutRef<"input"> {
  title: string,
}

function CounterInputComp({
  title,
  ...restProps
}: ICounterInputProps): JSX.Element {
  return (
    <div className={styles.container}>
      <label className={styles.title}>{title}</label>
      <input
        className={styles.input}
        type="number"
        defaultValue={COUNTER_DEFAULT_VALUE}
        {...restProps}
      />
    </div>
  )
}

export default CounterInputComp;
