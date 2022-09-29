import React from 'react';
import styles from './styles.module.scss';

interface ICounterInputProps extends React.ComponentPropsWithoutRef<"input"> {
  title: string,
}

function CounterInputComp({
  title,
  ...restProps
}: ICounterInputProps): JSX.Element {
  const inputRef = React.useRef<HTMLInputElement>(null!);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value;
    inputRef.current.value = value && value > 0 ? `${value}` : '';
  }

  return (
    <div className={styles.container}>
      <label className={styles.title}>{title}</label>
      <input
        ref={inputRef}
        className={styles.input}
        type="number"
        onChange={onChange}
        {...restProps}
      />
    </div>
  )
}

export default CounterInputComp;
