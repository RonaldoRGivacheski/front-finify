import type { RouteRecordRaw } from 'vue-router';

import { mergeRouteModules, traverseTreeValues } from '@vben/utils';

import { coreRoutes, fallbackNotFoundRoute } from './core';

const dynamicRouteFiles = import.meta.glob('./modules/**/*.ts', {
  eager: true,
});

//  If you need it, you can open the comments and create a folder
// const externalRouteFiles = import.meta.glob('./external/**/*.ts', { eager: true });
// const staticRouteFiles = import.meta.glob('./static/**/*.ts', { eager: true });

/**  Dynamic routing  */
const dynamicRoutes: RouteRecordRaw[] = mergeRouteModules(dynamicRouteFiles);

/**  External route list, you can access these pages without Layout, which may be used for embedding in other systems (will not be displayed in the menu)  */
// const externalRoutes: RouteRecordRaw[] = mergeRouteModules(externalRouteFiles);
// const staticRoutes: RouteRecordRaw[] = mergeRouteModules(staticRouteFiles);
const staticRoutes: RouteRecordRaw[] = [];
const externalRoutes: RouteRecordRaw[] = [];

/**  Route list, composed of basic routes, external routes, and 404 fallback routes
 *   No permission verification is required (it will always be displayed in the menu)  */
const routes: RouteRecordRaw[] = [
  ...coreRoutes,
  ...externalRoutes,
  fallbackNotFoundRoute,
];

/**  Basic route list, these routes do not need to enter permission interception  */
const coreRouteNames = traverseTreeValues(coreRoutes, (route) => route.name);

/**  Route list with permission verification, including dynamic and static routes  */
const accessRoutes = [...dynamicRoutes, ...staticRoutes];
export { accessRoutes, coreRouteNames, routes };
