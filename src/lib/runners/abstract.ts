import { Model } from "../model";

export enum RunnerSolvers {
  Minion,
  SAT,
}

export interface RunnerOptions {
  numberOfSolutions: number;
  solver: RunnerSolvers;
}

export abstract class Runner {
  abstract loop(indefinite: boolean): void;
  abstract enqueue(model: Model, options: RunnerOptions): void;
}
