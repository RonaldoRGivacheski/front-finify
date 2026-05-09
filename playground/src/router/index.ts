import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

import { resetStaticRoutes } from '@vben/utils';

import { createRouterGuard } from './guard';
import { routes } from './routes';

/**
 * @zh_CN 创建vue-router实例
 * @en-US Create vue-router instance
 * @pt-BR Create vue-router instance
 */
const router = createRouter({
  history:
    import.meta.env.VITE_ROUTER_HISTORY === 'hash'
      ? createWebHashHistory(import.meta.env.VITE_BASE)
      : createWebHistory(import.meta.env.VITE_BASE),
  // Should be added to the initial route list.
  routes,
  scrollBehavior: (to, _from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    }
    return to.hash ? { behavior: 'smooth', el: to.hash } : { left: 0, top: 0 };
  },
  // Should trailing slashes be prohibited.
  // strict: true,
});

const resetRoutes = () => resetStaticRoutes(router, routes);

// Create router guard
createRouterGuard(router);

export { resetRoutes, router };
