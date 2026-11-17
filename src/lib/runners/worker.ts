interface EmscriptenFS {
    writeFile(path: string, data: unknown): void;
    readFile(path: string, opts: { encoding: "utf8" }): string;
}

interface ConjureEngine {
    FS: EmscriptenFS;
    callMain(args: string[]): number | undefined;
}

interface WorkerInput {
    args: string[];
    files: Record<string, string>;
    captureFiles: string[];
}

// A Web Worker needs its own entry module. Each run gets a fresh worker and
// engine, keeping the page responsive and the in-memory files independent.
// Emscripten generates this factory when compiling the standard CLI to Wasm.
self.onmessage = async ({ data }: MessageEvent<WorkerInput>) => {
    let stdout = "", stderr = "";
    let operation = "load the Wasm executable (conjure_oxide.wasm)";

    try {
        self.postMessage({ type: "stage", stage: "loading" });

        const moduleUrl: string = new URL("conjure.mjs", self.location.origin).href;
        const createConjure = (await import(moduleUrl)).default;

        const engine: ConjureEngine = await createConjure({
            // Emscripten option: wait for callMain() instead of running main() on startup.
            noInitialRun: true,

            // Emscripten option: find the Wasm file beside this worker module.
            locateFile: (name: string) => `/${name}`,

            // Emscripten options: collect the CLI's standard output and standard error.
            print: (line: string) => { stdout += line + "\n"; },
            printErr: (line: string) => { stderr += line + "\n"; },
        });

        for (const [path, contents] of Object.entries(data.files)) {
            operation = `write input file ${path}`;
            // These files belong to this engine, not the user's disk or another run.
            engine.FS.writeFile(path, contents);
        }

        self.postMessage({ type: "stage", stage: "running" });

        operation = "run conjure-oxide";

        const exitCode = engine.callMain([...data.args]);

        const files = Object.fromEntries(
            data.captureFiles.map((path: string) => {
            operation = `read output file ${path} after CLI exit code ${exitCode}`;
            return [path, engine.FS.readFile(path, { encoding: "utf8" })];
        }));

        self.postMessage({ type: "result", result: { exitCode, stdout, stderr, files } });
    } catch (error) {
        self.postMessage({ type: "error", error: `Could not ${operation}: ${String(error)}${stderr ? "\n" + stderr : ""}` });
    }
};