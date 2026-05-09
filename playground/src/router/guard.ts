import type { Router } from 'vue-router';

import { LOGIN_PATH } from '@vben/constants';
import { preferences } from '@vben/preferences';
import { useAccessStore, useUserStore } from '@vben/stores';
import { startProgress, stopProgress } from '@vben/utils';

import { accessRoutes, coreRouteNames } from '#/router/routes';
import { useAuthStore } from '#/store';

import { generateAccess } from './access';

/**
 * General Guard Configuration
 * @param router
 */
function setupCommonGuard(router: Router) {
  // Record of pages that have been loaded
  const loadedPaths = new Set<string>();

  router.beforeEach((to) => {
    to.meta.loaded = loadedPaths.has(to.path);

    // Page loading progress bar
    if (!to.meta.loaded && preferences.transition.progress) {
      startProgress();
    }
    return true;
  });

  router.afterEach((to) => {
    // Record whether the page has been loaded. If it has been loaded, the subsequent page switching animations and other effects will not be repeated.
    loadedPaths.add(to.path);

    // Close page loading progress bar
    if (preferences.transition.progress) {
      stopProgress();
    }
  });
}

/**
 * Permission Access Guard Configuration
 * @param router
 */
function setupAccessGuard(router: Router) {
  router.beforeEach(async (to, from) => {
    const accessStore = useAccessStore();
    const userStore = useUserStore();
    const authStore = useAuthStore();
    // Basic routes, these routes do not need to enter permission interception
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

    // accessToken Check
    if (!accessStore.accessToken) {
      // If explicitly declared to ignore access permission, it can be accessed
      if (to.meta.ignoreAccess) {
        return true;
      }

      // No access permission, jump to login page
      if (to.fullPath !== LOGIN_PATH) {
        return {
          path: LOGIN_PATH,
          // If not needed, just delete query
          query:
            to.fullPath === preferences.app.defaultHomePath
              ? {}
              : { redirect: encodeURIComponent(to.fullPath) },
          // Carry the current jump page, redirect to the same page after login
          replace: true,
        };
      }
      return to;
    }

    // Whether dynamic routing has been generated
    if (accessStore.isAccessChecked) {
      return true;
    }

    // Generate route table
    // Get the role list of the currently logged in user
    const userInfo = userStore.userInfo || (await authStore.fetchUserInfo());
    const userRoles = userInfo.roles ?? [];

    // Generate menu and route
    const { accessibleMenus, accessibleRoutes } = await generateAccess({
      roles: userRoles,
      router,
      routes: accessRoutes,
    });

    // Save menu information and route information
    accessStore.setAccessMenus(accessibleMenus);
    accessStore.setAccessRoutes(accessibleRoutes);
    accessStore.setIsAccessChecked(true);
    let redirectPath: string;
    if (from.query.redirect) {
      redirectPath = from.query.redirect as string;
    } else if (to.fullPath === preferences.app.defaultHomePath) {
      redirectPath = preferences.app.defaultHomePath;
    } else if (userInfo.homePath && to.fullPath === userInfo.homePath) {
      redirectPath = userInfo.homePath;
    } else {
      redirectPath = to.fullPath;
    }
    return {
      ...router.resolve(decodeURIComponent(redirectPath)),
      replace: true,
    };
  });
}

/**
 * Project Guard Configuration
 * @param router
 */
function createRouterGuard(router: Router) {
  /** General */
  setupCommonGuard(router);
  /** Permission Access */
  setupAccessGuard(router);
}

export { createRouterGuard };
