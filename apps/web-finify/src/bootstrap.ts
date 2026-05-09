import { createApp, watchEffect } from 'vue';

import { registerAccessDirective } from '@vben/access';
import { registerLoadingDirective } from '@vben/common-ui/es/loading';
import { preferences } from '@vben/preferences';
import { initStores } from '@vben/stores';
import '@vben/styles';
import '@vben/styles/antd';

import { useTitle } from '@vueuse/core';

import { $t, setupI18n } from '#/locales';

import { initComponentAdapter } from './adapter/component';
import { initSetupVbenForm } from './adapter/form';
import App from './app.vue';
import { router } from './router';

async function bootstrap(namespace: string) {
  // Initialize component adapter
  await initComponentAdapter();

  // Initialize form components
  await initSetupVbenForm();

  // //  Set the default configuration for the pop-up window
  // setDefaultModalProps({
  //   fullscreenButton: false,
  // });
  // //  Set the default configuration for the drawer
  // setDefaultDrawerProps({
  //   zIndex: 1020,
  // });

  const app = createApp(App);

  //  Register v-loading directive
  registerLoadingDirective(app, {
    loading: 'loading', //  @en_US Here you can customize the directive name, or explicitly provide false to indicate not to register this directive
    spinning: 'spinning',
  });

  //  Internationalization i18n configuration
  await setupI18n(app);

  //  Configure pinia-tore
  await initStores(app, { namespace });

  //  Install access directive
  registerAccessDirective(app);

  //  Initialize tippy
  const { initTippy } = await import('@vben/common-ui/es/tippy');
  initTippy(app);

  //  Configure routing and routing guards
  app.use(router);

  //  Configure Motion plugin
  const { MotionPlugin } = await import('@vben/plugins/motion');
  app.use(MotionPlugin);

  //  Dynamic title update
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
