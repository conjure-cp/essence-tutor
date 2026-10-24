import { A } from '@solidjs/router';
import { For } from 'solid-js';
import { useAppState } from '../AppContext';
import '../css/Nav.css';

const links = [
  { label: 'Home', href: '/', end: true },
  { label: 'Tutorials', href: '/tutorial/01_intro' },
  { label: 'Features', href: '/features' }
];

export default function Nav() {
  const app = useAppState();
  return (
    <nav class="nav">
      <div class="nav__inner">
        <A href="/" class="nav__brand">Navbar</A>

        <ul class="nav__list">
          <For each={links}>
            {(link) => (
              <li>
                <A
                  href={link.href}
                  end={link.end}
                  class="nav__link"
                  activeClass="nav__link--active"
                >
                  {link.label}
                </A>
              </li>
            )}
          </For>
        </ul>

        <button class="nav__toggle" onClick={() => app.setDark(!app.isDark)}>
          {app.isDark ? 'Light' : 'Dark'} mode
        </button>
      </div>
    </nav>
  );
}