import { Model } from "../model";

export abstract class Runner {
  public abstract solve(model: Model, options: Map<string, string>): void;
}
