import { Model } from "../impl/model";

export enum RunnerSolvers {
    Minion,
    SAT
}

export interface RunnerOptions {
    numberOfSolutions: number;
    solver: RunnerSolvers;
}

export abstract class Runner {
    abstract queue(model: Model, options: RunnerOptions): void;
    abstract poll(model: Model): void;
}
