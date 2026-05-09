import type { RouteRecordRaw } from 'vue-router';

import { mergeRouteModules, traverseTreeValues } from '@vben/utils';

import { coreRoutes, fallbackNotFoundRoute } from './core';

const dynamicRouteFiles = import.meta.glob('./modules/**/*.ts', {
  eager: true,
});

// If needed, you can uncomment the following and create folders
// const externalRouteFiles = import.meta.glob('./external/**/*.ts', { eager: true });
// const staticRouteFiles = import.meta.glob('./static/**/*.ts', { eager: true });

/** Dynamic routes */
const dynamicRoutes: RouteRecordRaw[] = mergeRouteModules(dynamicRouteFiles);

/** An external route list; accessing these pages doesn't require layout and may be used for embedding in other systems (they won't appear in the menu). */
// const externalRoutes: RouteRecordRaw[] = mergeRouteModules(externalRouteFiles);
// const staticRoutes: RouteRecordRaw[] = mergeRouteModules(staticRouteFiles);
const staticRoutes: RouteRecordRaw[] = [];
const externalRoutes: RouteRecordRaw[] = [];

/** The list of routes is composed of basic routes, external routes, and 404 fallback routes. These routes do not require permission verification and will always be displayed in the menu. */
const routes: RouteRecordRaw[] = [
  ...coreRoutes,
  ...externalRoutes,
  fallbackNotFoundRoute,
];

/** The list of core routes; these routes do not need to enter permission interception. */
const coreRouteNames = traverseTreeValues(coreRoutes, (route) => route.name);

/** The list of routes with permission verification, including dynamic and static routes */
const accessRoutes = [...dynamicRoutes, ...staticRoutes];

const componentKeys: string[] = Object.keys(
  import.meta.glob('../../views/**/*.vue'),
)
  .filter((item) => !item.includes('/modules/'))
  .map((v) => {
    const path = v.replace('../../views/', '/');
    return path.endsWith('.vue') ? path.slice(0, -4) : path;
  });

export { accessRoutes, componentKeys, coreRouteNames, routes };
