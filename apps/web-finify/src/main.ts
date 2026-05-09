import { initPreferences } from '@vben/preferences';
import { unmountGlobalLoading } from '@vben/utils';

import { overridesPreferences, preferencesExtension } from './preferences';

/**
 *  @en_US Application initialization is completed before the page is loaded and rendered
 */
async function initApplication() {
  //  Name is used to specify the unique identifier of the project
  //  Used to distinguish the preference settings of different projects, key prefix for storing data, and other data that needs to be isolated
  const env = import.meta.env.PROD ? 'prod' : 'dev';
  const appVersion = import.meta.env.VITE_APP_VERSION;
  const namespace = `${import.meta.env.VITE_APP_NAMESPACE}-${appVersion}-${env}`;

  // app preference settings initialization
  await initPreferences({
    extension: preferencesExtension,
    namespace,
    overrides: overridesPreferences,
  });

  //  Start the application and mount it
  //  Vue application main logic and view
  const { bootstrap } = await import('./bootstrap');
  await bootstrap(namespace);

  //  Remove and destroy loading
  unmountGlobalLoading();
}

initApplication();
