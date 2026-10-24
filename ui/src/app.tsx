import { Suspense, type ParentComponent } from 'solid-js';
import { AppContextProvider } from './AppContext';
import Nav from './components/Nav';

const App: ParentComponent = (props) => (
  <AppContextProvider>
    <Nav />
    <main>
      <Suspense>{props.children}</Suspense>
    </main>
  </AppContextProvider>
);

export default App;