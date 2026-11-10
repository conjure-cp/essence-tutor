import { Model } from "../model";

let runner: Runner | undefined = undefined;

import { Model, ModelState } from "../model";

let runner: Runner | undefined = undefined;


export abstract class Runner {
  public abstract solve(model: Model, solver?: string, options?: string[]): void;

  public static setInstance(instance: Runner) {
    runner = instance;
  }

  public static getInstance(): Runner | undefined {
    return runner;
  }
}
