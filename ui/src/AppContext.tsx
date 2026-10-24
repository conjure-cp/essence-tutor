import * as storage from '@solid-primitives/storage';
import { Meta, MetaProvider, Title } from '@solidjs/meta';
import {
  ParentComponent, Suspense, createContext, createEffect, createResource, useContext,
} from 'solid-js';
import { createStore } from 'solid-js/store';

const LOCALE = 'en';
const labels: Record<string, string> = {
  'global.title': 'Conjure Tutorial',
  'global.description': 'Learn constraint modelling with Conjure Oxide, right in your browser.',
  'tutorial.solve': 'Solve',
  'tutorial.reset': 'Reset',
};

interface Settings { dark: boolean }

const initialSettings = (): Settings => ({
  dark: window.matchMedia('(prefers-color-scheme: dark)').matches,
});

function deserialize(value: string): Settings {
  try {
    const parsed = JSON.parse(value);
    if (parsed && typeof parsed.dark === 'boolean') return { dark: parsed.dark };
  } catch { /* fall through */ }
  return initialSettings();
}

interface AppState {
  get isDark(): boolean;
  setDark(value: boolean): void;
  get locale(): string;
  t: (key: string) => string;
}

const AppContext = createContext<AppState>({} as AppState);
export const useAppState = () => useContext(AppContext);

export const AppContextProvider: ParentComponent = (props) => {
  const now = new Date();
  const cookieOptions: storage.CookieOptions = {
    expires: new Date(now.getFullYear() + 1, now.getMonth(), now.getDate()),
  };

  // Saved in a cookie for one year
  const [settings, set] = storage.makePersisted(createStore(initialSettings()), {
    storage: storage.cookieStorage,
    storageOptions: cookieOptions,
    deserialize,
  });

  createEffect(() => { document.documentElement.lang = LOCALE; });
  createEffect(() => {
    document.documentElement.classList.toggle('dark', settings.dark);
  });

  const t = (key: string) => labels[key] ?? key;

  const state: AppState = {
    get isDark() { return settings.dark; },
    setDark(value) { set('dark', value); },
    get locale() { return LOCALE; },
    t
  };

  return (
    <MetaProvider>
      <Suspense fallback={<p class="p-10">Loading...</p>}>
        <AppContext.Provider value={state}>
          <Title>{t('global.title')}</Title>
          <Meta name="description" content={t('global.description')} />
          <Meta name="lang" content={LOCALE} />
          {props.children}
        </AppContext.Provider>
      </Suspense>
    </MetaProvider>
  );
};