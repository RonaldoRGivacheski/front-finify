import type { Router } from 'vue-router';

import { LOGIN_PATH } from '@vben/constants';
import { preferences } from '@vben/preferences';
import { useAccessStore, useUserStore } from '@vben/stores';
import { startProgress, stopProgress } from '@vben/utils';

import { accessRoutes, coreRouteNames } from '#/router/routes';
import { useAuthStore } from '#/store';

import { generateAccess } from './access';

/**
 *  Common guard configuration
 * @param router
 */
function setupCommonGuard(router: Router) {
  //  Record already loaded pages
  const loadedPaths = new Set<string>();

  router.beforeEach((to) => {
    to.meta.loaded = loadedPaths.has(to.path);

    //  Page loading progress bar
    if (!to.meta.loaded && preferences.transition.progress) {
      startProgress();
    }
    return true;
  });

  router.afterEach((to) => {
    //  Record whether the page has been loaded. If it has been loaded, the subsequent page switching animation and other effects will not be repeated

    loadedPaths.add(to.path);

    //  Close the page loading progress bar
    if (preferences.transition.progress) {
      stopProgress();
    }
  });
}

/**
 *  Permission access guard configuration
 * @param router
 */
function setupAccessGuard(router: Router) {
  router.beforeEach(async (to, from) => {
    const accessStore = useAccessStore();
    const userStore = useUserStore();
    const authStore = useAuthStore();

    //  Basic routes, these routes do not need to enter permission interception
    if (coreRouteNames.includes(to.name as string)) {
      if (to.path === LOGIN_PATH && accessStore.accessToken) {
        return decodeURIComponent(
          (to.query?.redirect as string) ||
            userStore.userInfo?.homePath ||
            preferences.app.defaultHomePath,
        );
      }
      return true;
    }

    //  accessToken check
    if (!accessStore.accessToken) {
      //  If access permission is explicitly ignored, it can be accessed
      if (to.meta.ignoreAccess) {
        return true;
      }

      //  No access permission, jump to login page
      if (to.fullPath !== LOGIN_PATH) {
        return {
          path: LOGIN_PATH,
          //  If not needed, just delete query
          query:
            to.fullPath === preferences.app.defaultHomePath
              ? {}
              : { redirect: encodeURIComponent(to.fullPath) },
          //  Carrying the current page to jump to, and jumping to the same page after login
          replace: true,
        };
      }
      return true;
    }

    //  Whether the dynamic route has been generated
    if (accessStore.isAccessChecked) {
      return true;
    }

    //  Generate route table
    //  The list of role identifiers owned by the currently logged-in user
    let userInfo;
    let accessibleMenus;
    let accessibleRoutes;

    try {
      userInfo = userStore.userInfo || (await authStore.fetchUserInfo());
      const userRoles = userInfo.roles ?? [];

      //  Generate menus and routes
      const accessResult = await generateAccess({
        roles: userRoles,
        router,
        //  If route.meta.menuVisibleWithForbidden = true, it will be displayed in the menu, but access will be redirected to the 403 page
        routes: accessRoutes,
      });
      
      accessibleMenus = accessResult.accessibleMenus;
      accessibleRoutes = accessResult.accessibleRoutes;
    } catch (error) {
      // If fetching user info or menus fails, clear token and redirect to login
      console.error('Error during access generation:', error);
      accessStore.setAccessToken(null);
      return { path: LOGIN_PATH, replace: true };
    }

    //  Save menu information and route information
    accessStore.setAccessMenus(accessibleMenus);
    accessStore.setAccessRoutes(accessibleRoutes);
    accessStore.setIsAccessChecked(true);
    const redirectPath = (from.query.redirect ??
      (to.path === preferences.app.defaultHomePath
        ? userInfo.homePath || preferences.app.defaultHomePath
        : to.fullPath)) as string;

    return {
      ...router.resolve(decodeURIComponent(redirectPath)),
      replace: true,
    };
  });
}

/**
 *  Project guard configuration
 * @param router
 */
function createRouterGuard(router: Router) {
  /** Common */
  setupCommonGuard(router);
  /** Permission access */
  setupAccessGuard(router);
}

export { createRouterGuard };
