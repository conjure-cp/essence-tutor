import { Model, ModelState } from "../model";
import { Runner } from "./abstract";

export const CONJURE_AAS_DOMAIN = "https://conjure-aas.cs.st-andrews.ac.uk";
export const CONJURE_AAS_APPNAME = "essence-tutor";

export class AASRunner implements Runner {
  public solve(model: Model, _: Map<string, string>): void {
      // TODO: make this work in a separate thread so it doesn't lock everything up
      const solver = "kissat";
      const options = [];
      const metadata = "";
      
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

    // TODO: update the model object
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
