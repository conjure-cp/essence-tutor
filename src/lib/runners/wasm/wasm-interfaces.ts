import {Model} from "@/lib/model";
import {Runner} from "@/lib/runners/abstract";

export interface RunOptions {
    /** Wall-clock limit including startup; defaults to 30000 ms. */
    timeoutMs?: number;
    signal?: AbortSignal;
    onStage?: (stage: "loading" | "running") => void;
    /** Files to return as UTF-8 text after the CLI finishes; missing files reject. */
    captureFiles?: string[];
}

export interface RunResult {
    exitCode: number;
    stdout: string;
    stderr: string;
    elapsedMs: number;
    files: Record<string, string>;
}