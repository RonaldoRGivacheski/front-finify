import { createApp, watchEffect } from 'vue';

import { registerAccessDirective } from '@vben/access';
import { registerLoadingDirective } from '@vben/common-ui';
import { providePluginsOptions } from '@vben/plugins';
import { preferences } from '@vben/preferences';
import { initStores } from '@vben/stores';
import '@vben/styles';
import '@vben/styles/antd';

import { useTitle } from '@vueuse/core';

import { $t, setupI18n } from '#/locales';
import { router } from '#/router';

import { initComponentAdapter } from './adapter/component';
import { initSetupVbenForm, useVbenForm } from './adapter/form';
import App from './app.vue';
import { initTimezone } from './timezone-init';

async function bootstrap(namespace: string) {
  // init component adapter
  await initComponentAdapter();

  // init form component
  await initSetupVbenForm();

  // inject plugin global configuration
  providePluginsOptions({
    form: { useVbenForm },
  });

  // set default configuration for modal
  // setDefaultModalProps({
  //   fullscreenButton: false,
  // });
  // set default configuration for drawer
  // setDefaultDrawerProps({
  //   zIndex: 1020,
  // });

  const app = createApp(App);

  // register v-loading directive
  registerLoadingDirective(app, {
    loading: 'loading', // can customize directive name here, or provide false to not register this directive
    spinning: 'spinning',
  });

  // internationalization i18n configuration
  await setupI18n(app);

  // configure pinia-tore
  await initStores(app, { namespace });

  // init timezoneHANDLER
  initTimezone();

  // register access directive
  registerAccessDirective(app);

  // init tippy
  const { initTippy } = await import('@vben/common-ui/es/tippy');
  initTippy(app);

  // configure router and router guard
  app.use(router);

  // configure @tanstack/vue-query
  const { VueQueryPlugin } = await import('@tanstack/vue-query');
  app.use(VueQueryPlugin);

  // configure motion plugin
  const { MotionPlugin } = await import('@vben/plugins/motion');
  app.use(MotionPlugin);

  // dynamic update title
  watchEffect(() => {
    if (preferences.app.dynamicTitle) {
      const routeTitle = router.currentRoute.value.meta?.title;
      const pageTitle =
        (routeTitle ? `${$t(routeTitle)} - ` : '') + preferences.app.name;
      useTitle(pageTitle);
    }
  });

  app.mount('#app');
}

export { bootstrap };
