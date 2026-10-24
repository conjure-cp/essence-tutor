export interface RunResult { exitCode: number; stdout: string; stderr: string }

// PLACEHOLDER: replace the body with the real Conjure Oxide Wasm call later.
export async function runModel(source: string): Promise<RunResult> {
  await new Promise((r) => setTimeout(r, 400)); // pretend to think
  if (!source.trim()) {
    return { exitCode: 1, stdout: '', stderr: 'Error: model is empty' };
  }
  return {
    exitCode: 0,
    stdout: `(placeholder) Received ${source.split('\n').length} lines.\nReal solver output will appear here.`,
    stderr: '',
  };
}