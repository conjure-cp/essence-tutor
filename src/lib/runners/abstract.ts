import { Model } from "../model";

let runner: Runner | undefined = undefined;

export abstract class Runner {
  public async solve(model: Model, solver?: string, options?: string[]): Promise<void> {
    throw new Error("cannot solve on abstract runner")
  }

  public static setInstance(instance: Runner) {
    runner = instance;
  }

  public static getInstance(): Runner | undefined {
    return runner;
  }
}
