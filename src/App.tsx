import React from 'react';
import Container from './components/Container';
import CounterTable from './components/CounterTable';
import CounterForm from './components/CounterForm';
import PeopleWaiting from './components/PeopleWaiting';
import Button from './components/Button';
import { BTN_NEXT } from './constants';
import type { ICounterData } from './types';
import styles from './App.module.scss';

const data: ICounterData[] = [{
  id: 1,
  name: 'Tony',
  processing: undefined,
  processed: undefined,
  numberOfPeople: undefined
}, {
  id: 2,
  name: 'Jerry',
  processing: undefined,
  processed: undefined,
  numberOfPeople: undefined
}, {
  id: 3,
  name: 'Elenore',
  processing: undefined,
  processed: undefined,
  numberOfPeople: undefined
}, {
  id: 4,
  name: 'Natasha',
  processing: undefined,
  processed: undefined,
  numberOfPeople: undefined
}]

function App(): JSX.Element {
  return (
    <Container className={styles.container}>
      <CounterTable dataSource={data} />
      <div className={styles.tableActions}>
        <PeopleWaiting />
        <Button primary>{BTN_NEXT}</Button>
      </div>
      <CounterForm dataSource={data} />
    </Container>
  );
}

export default App;
