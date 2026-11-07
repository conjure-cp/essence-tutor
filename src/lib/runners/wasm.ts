import {Model} from "@/lib/model";
import {Runner} from "@/lib/runners/abstract";

export class WASMRunner implements Runner {
    public async solve(model: Model, solver?: string, options?: string[]): Promise<void> {
        const args: string[] = ["solve", "/model.essence"];
        const files: {[key: string]: string} = { "/model.essence": model.getModel() };

        const params: string = model.getParameterEssenceString();

        if (params) {
            args.push("/model.param");
            files["/model.param"] = params;
        }

        // Ordinary CLI arguments: add e.g. "--solver", "sat" or "-n", "1000" here.
        args.push("--output-format", "json", "-o", "/solutions.json");

        if (solver) {
            args.push("--solver", solver);
        }

        const result = await this.run(args, files, { captureFiles: ["/solutions.json"] });
    }

    private async run(args: string[], files: {[key: string]: string} = {}, options: {} = {}) {

    }
}