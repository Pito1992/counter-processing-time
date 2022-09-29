import React from 'react';
import {
  COUNTER_START_NUMBER_DEFAULT_VALUE,
  COUNTER_NEXT_NUMBER_DEFAULT_VALUE,
  COUNTER_PROCESSING_TIME_DEFAULT_VALUE
} from '../constants';
import type { ICounterInitialState } from '../types';

export const initialState: ICounterInitialState = {
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

export interface ICounterContext {
  counterState: ICounterInitialState;
  setCounterState: React.Dispatch<React.SetStateAction<ICounterInitialState>>;
}

const CounterContext = React.createContext<ICounterContext>({
  counterState: initialState,
  setCounterState: () => {}
});

export function CounterContextProvider({ children }: React.PropsWithChildren<{}>): JSX.Element {
  const [counterState, setCounterState] = React.useState(initialState);

  return (
    <CounterContext.Provider value={{ counterState, setCounterState }}>
      {children}
    </CounterContext.Provider>
  )
}


export default CounterContext;
