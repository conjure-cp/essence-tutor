import {Model} from "@/lib/model";
import {Runner} from "@/lib/runners/abstract";

interface RunOptions {
    /** Wall-clock limit including startup; defaults to 30000 ms. */
    timeoutMs?: number;
    signal?: AbortSignal;
    onStage?: (stage: "loading" | "running") => void;
    /** Files to return as UTF-8 text after the CLI finishes; missing files reject. */
    captureFiles?: string[];
}
interface RunResult {
    exitCode: number;
    stdout: string;
    stderr: string;
    elapsedMs: number;
    files: Record<string, string>;
}

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

    private async run(
        args: string[],
        files: {[key: string]: string} = {},
        options: RunOptions = {}
    ) {
        const started = performance.now();
        const { timeoutMs = 30000, signal, onStage, captureFiles = []} = options;

        // Chris' wise words (CWW): Invalid timer values can silently become a 1 ms deadline in JavaScript.
        if (!Number.isInteger(timeoutMs) || timeoutMs < 1 || timeoutMs > 2147483647) {
            return Promise.reject(new RangeError("timeoutMs must be an integer from 1 to 2147483647."));
        }

        if (signal?.aborted) {
            return Promise.reject(new DOMException("Run cancelled.", "AbortError"));
        }

        return new Promise((resolve, reject) => {
            let worker, timer;
            let finished: boolean = false;

            // CWW: Every outcome terminates the worker and removes the timer and abort listener.
            // FIXME: are the arguments actually optional
            const finish = (error?: any, result?: string) => {
                if (finished) return;

                finished = true;
                clearTimeout(timer);
                signal?.removeEventListener("abort", cancel);
                worker?.terminate();

                if (error) reject(error);
                else resolve({ ...result, elapsedMs: performance.now() - started });
            }

            const cancel = () => finish(new DOMException("Run cancelled.", "AbortError"));

            try {
                signal?.addEventListener("abort", cancel, {once: true});
                timer = setTimeout(() => finish(new DOMException(`Run exceeded ${timeoutMs} ms.`, "TimeoutError")), timeoutMs);

                worker = new Worker(new URL("./worker.mjs", import.meta.url), { type: "module" });
                worker.onmessage = ({ data }) => {
                    if (finished) return;

                    if (data.type === "stage") {
                        try { onStage?.(data.stage); }
                        catch(e) { finish(e) }
                    }
                    else if (data.type === "error") {
                        finish(new Error(data.error));
                    }
                    else finish(null, data.result)
                };

                worker.onerror = error => finish(new Error(`Could not load or run worker.mjs. Check that the complete Wasm package is being served: ${error.message}`));
                worker.onmessageerror = () => finish(new Error("Could not read a message from the CLI worker."));
                worker.postMessage({ args, files, captureFiles });
            }
            catch (e) {
                finish(e);
            }
        })
    }
}