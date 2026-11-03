export enum ModelState {
    Unsolved,
    Waiting,
    Solved,
    NonTerminating,
}

export class Model {
    protected state: ModelState;

    private model: string;
    private parameters: Map<string, string>;

    protected runnerId: string | undefined;
    protected solutions: Map<string, string>[] | undefined;

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

    getParameterString(): string {
        let result = "";
        this.parameters.forEach((k: string, v: string) => {
            result += `letting ${k} be ${v}\n`
        })
        return result;
    }

    getRunnerId(): string | undefined {
        return this.runnerId;
    }

    getSolutionCount(): number | undefined {
        return this.solutions?.length;
    }

    getSolutions(): Map<string, string>[] | undefined {
        return this.solutions;
    }

    // mutators

    setParameter(k: string, v: string) {
        this.parameters.set(k, v);
    }

    deleteParameter(k: string) {
        this.parameters.delete(k);
    }
}
