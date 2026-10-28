import { For, createMemo, createSignal } from 'solid-js';
import { runModel, type RunResult } from '../ConjureOxide';

export interface Tab { name: string; source: string }

interface Props {
  tabs: Tab[];
  setTabs: (tabs: Tab[]) => void;
  current: string;
  setCurrent: (name: string) => void;
  reset: () => void;
}

export default function ConjurePanel(props: Props) {
  const [result, setResult] = createSignal<RunResult | null>(null);
  const [running, setRunning] = createSignal(false);

  const currentTab = createMemo(
    () => props.tabs.find((t) => t.name === props.current) ?? props.tabs[0],
  );

  const updateSource = (source: string) =>
    props.setTabs(props.tabs.map((t) => (t.name === currentTab().name ? { ...t, source } : t)));

  const run = async () => {
    setRunning(true);
    try {
      setResult(await runModel(currentTab().source));
    } finally {
      setRunning(false);
    }
  };

  return (
    <div class="flex flex-col h-full min-w-0">
      <div class="flex items-center gap-2 px-4 py-2 border-b dark:border-solid-darkLighterBg">
        <For each={props.tabs}>
          {(tab) => (
            <button
              class="px-3 py-1 rounded text-sm"
              classList={{ 'bg-blue-100 dark:bg-solid-medium': tab.name === currentTab()?.name }}
              onClick={() => props.setCurrent(tab.name)}
            >
              {tab.name}
            </button>
          )}
        </For>
        <button class="ml-auto px-3 py-1 text-sm border rounded" onClick={props.reset}>
          Reset code
        </button>
        <button
          class="px-3 py-1 text-sm rounded bg-solid-default text-white disabled:opacity-50"
          disabled={running()}
          onClick={run}
        >
          {running() ? 'Running...' : 'Run'}
        </button>
      </div>

      <textarea
        class="flex-1 p-4 font-mono text-sm resize-none outline-none bg-white dark:bg-solid-darkbg dark:text-gray-100"
        spellcheck={false}
        value={currentTab()?.source ?? ''}
        onInput={(e) => updateSource(e.currentTarget.value)}
      />

      <pre class="h-1/3 overflow-auto p-4 text-sm border-t bg-gray-50 dark:bg-solid-darkLighterBg dark:text-gray-100 dark:border-solid-darkLighterBg">
        {result()
          ? result()!.exitCode === 0 ? result()!.stdout : result()!.stderr
          : 'Press Run to see output.'}
      </pre>
    </div>
  );
}