export enum ModelState {
  Unsolved,
  Waiting,
  Solved,
  NonTerminating,
  Error
}

export class Model {
  private state: ModelState;

  private model: string;
  private parameters: Map<string, string>;

  private solutions: Map<string, string>[] | undefined;
  private error: string | undefined;

  constructor(model: string, parameters: Map<string, string>) {
    this.state = ModelState.Unsolved;

    this.model = model;
    this.parameters = parameters;
  }

  // accessors

  getState(): ModelState {
    return this.state;
  }

  getModel(): string {
    return this.model;
  }

  getParameterJSONString(): string {
    return JSON.stringify(this.parameters);
  }

  getParameterEssenceString(): string {
    let result = "";
    this.parameters.forEach((k: string, v: string) => {
      result += `letting ${k} be ${v}\n`;
    });
    return result;
  }

  getSolutionCount(): number | undefined {
    return this.solutions?.length;
  }

  getSolutions(): Map<string, string>[] | undefined {
    return this.solutions;
  }

  getError(): string | undefined {
    return this.error;
  }

  // mutators
  setState(state: ModelState) {
    this.state = state;
  }

  setModel(model: string) {
    this.model = model;
  }

  setParameter(k: string, v: string) {
    this.parameters.set(k, v);
  }

  deleteParameter(k: string) {
    this.parameters.delete(k);
  }

  setSolutions(sols: Map<string, string>[] | undefined) {
    this.solutions = sols;
  }

  setError(error: string | undefined) {
    this.error = error;
    if (error != undefined) {
      this.state = ModelState.Error;
    }
  }
}
