import type { ICounterData, ICounterInitialState } from '../types';

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

type GetNewTasksInput = Pick<ICounterInitialState, 'nextNumber' | 'tasks' | 'lastTask'>
type GetNewTasksOutput = Pick<ICounterInitialState, 'tasks' | 'lastTask'>

export function getNewTasks({ nextNumber, tasks, lastTask }: GetNewTasksInput): GetNewTasksOutput {
  const tempTasks = [...tasks];
  let i = lastTask;
  while (++i < nextNumber) {
    tempTasks.push(i);
  }
  return {
    tasks: tempTasks,
    lastTask: tempTasks[tempTasks.length - 1] || lastTask,
  }
}

type CalculateTasksProcessingTime = Pick<ICounterInitialState, 'counterData' | 'tasks'>

export function calculateTasksProcessingTime({ counterData, tasks }: CalculateTasksProcessingTime): CalculateTasksProcessingTime {
  const countersLength = counterData.length;
  const tempTasks = [...tasks];
  const tempCounterData = [...counterData];
  let i = 0;
  let j = 0;
  while (i < countersLength) {
    const task = tempTasks[j];
    const counter = tempCounterData[i];
    
    if (!counter.processingTask && task) {
      tempCounterData[i] = handleProcessingTask(counter, task)
      tempTasks[j++] = 0;
    }
    if (counter.processingTask) {
      const isProcessingTaskCompleted = counter.taskProcessing.next().value;
      if (isProcessingTaskCompleted) {
        tempCounterData[i] = handleProcessedTasks(counter, task)
        tempTasks[j++] = 0;
      }
    }
    i++;
  }

  return {
    tasks: tempTasks.filter((task) => task),
    counterData: tempCounterData,
  }
}