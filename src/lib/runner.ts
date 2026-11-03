export enum RunnerSolvers {
    Minion,
    SAT
}

export interface RunnerResult {
    count: number;
    solutions: JSON;
}

export interface RunnerOptions {
    numberOfSolutions: number;
    solver: RunnerSolvers;
}

export abstract class Runner {
    abstract solve(model: string, parameters: string, options: RunnerOptions): RunnerResult;
}
