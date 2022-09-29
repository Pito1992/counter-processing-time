import type { ICounterData } from '../types';

export function* taskProcessingByTime(time: number): Generator<boolean> {
  let index = 0;
  while (true) {
    yield (++index === time) ? true : false;
  }
}

export function handleProcessingTask(counter: ICounterData, task: number) {
  return {
    ...counter,
    processingTask: task,
    taskProcessing: taskProcessingByTime(counter.processingTime),
  }
}
export function handleProcessedTasks(counter: ICounterData, task: number) {
  return {
    ...counter,
    processingTask: task || 0,
    processedTasks: [...counter.processedTasks, counter.processingTask],
    taskProcessing: taskProcessingByTime(counter.processingTime),
  }
}