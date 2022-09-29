import React from 'react';
import { NUMBER_OF_PEOPLE_WAITING } from '../../constants';
import styles from './styles.module.scss';

interface IPeopleWaitingProps extends React.ComponentPropsWithoutRef<"div"> {
  value: number
}

function PeopleWaitingComp({ className, value, children, ...restProps }: IPeopleWaitingProps): JSX.Element {
  return (
    <div className={styles.container} {...restProps}>
      {NUMBER_OF_PEOPLE_WAITING}: {value}
    </div>
  );
}

export default PeopleWaitingComp;