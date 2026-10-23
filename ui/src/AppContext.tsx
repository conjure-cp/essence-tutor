import { createContext, createSignal, useContext, ParentComponent, createEffect } from 'solid-js';

const [isDark, setDark] = createSignal(window.matchMedia('(prefers-color-scheme: dark)').matches);
const state = { get isDark() { return isDark(); }, setDark, locale: 'en', t: (key: string) => labels[key] ?? key };
const labels: Record<string, string> = { 'tutorial.solve': 'Solve', 'tutorial.reset': 'Reset' };

const Ctx = createContext(state);
export const useAppState = () => useContext(Ctx);

export const AppContextProvider: ParentComponent = (props) => {
  createEffect(() => document.documentElement.classList.toggle('dark', isDark()));
  return <Ctx.Provider value={state}>{props.children}</Ctx.Provider>;
};