import { lazy } from 'solid-js';
import type { RouteDefinition } from '@solidjs/router';

import Home from './pages/home';
import AboutData from './pages/about.data';
import { TutorialData } from './pages/Tutorial.data';

export const routes: RouteDefinition<any, any>[]  = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/about',
    component: lazy(() => import('./pages/about')),
  },
  {
    path: '/tutorial/:id?',
    component: lazy(() => import('./pages/Tutorial')),
  },
  {
    path: '**',
    component: lazy(() => import('./errors/404')),
  },
];