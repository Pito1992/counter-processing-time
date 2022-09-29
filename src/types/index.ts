export interface ICounterData {
  id: number | string;
  name: string;
  processingTask: number;
  processingTime: number;
  processedTasks: number[];
  taskProcessing?: any;
}

export interface ICounterInitialState {
  counterData: ICounterData[];
  startNumber: number;
  nextNumber: number;
  tasks: number[];
  lastTask: number;
}