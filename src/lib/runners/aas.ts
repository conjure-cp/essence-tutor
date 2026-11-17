import { Model, ModelState } from "../model";
import { Runner } from "./abstract";

export const CONJURE_AAS_DOMAIN = "https://conjure-aas.cs.st-andrews.ac.uk";
export const CONJURE_AAS_APPNAME = "essence-tutor";


const sleep = (period: number) => new Promise(resolve => setTimeout(resolve, period));


export class AASRunner implements Runner {
  public async solve(model: Model, solver?: string, options?: string[]): Promise<void> {
      const jobId = await this.submit(model, solver ? solver : "kissat", options ? options : []);
      let timeout = 1000;

      while (model.getState() == ModelState.Waiting) {
        await sleep(timeout);
        await this.poll(model, jobId);
        timeout *= 2;
      }
  }

  private async submit(model: Model, solver: string, options: string[]): Promise<string> {
    const response = (await fetch(
      `${CONJURE_AAS_DOMAIN}/submit`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          appName: CONJURE_AAS_APPNAME,
          solver: solver,
          model: model.getModel(),
          data: model.getParameterJSONString(),
          conjureOptions: options
        })
      }
    )).json();

    model.setState(ModelState.Waiting);

    return (await response).jobid;
  }

  private async poll(model: Model, jobId: string): Promise<void> {
    const response = (await (await fetch(
      `${CONJURE_AAS_DOMAIN}/get`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          appName: CONJURE_AAS_APPNAME,
          jobid: jobId
        })
      }
    )).json());

    if (response.status.startsWith("terminated")) {
      model.setError(response.logs.toString());
      return;
    }

    switch (response.status) {
      case "ok":
        model.setState(ModelState.Solved);
        model.setSolutions(response.solution);
        break;
      case "wait":
        model.setState(ModelState.Waiting);
        break;
      default:
        model.setState(ModelState.Unsolved);
        break;
    }
  }
}
