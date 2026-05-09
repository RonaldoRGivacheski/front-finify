import { initPreferences } from '@vben/preferences';
import { unmountGlobalLoading } from '@vben/utils';

import { overridesPreferences, preferencesExtension } from './preferences';

/**
 * after application initialization is complete, then load and render the page
 */
async function initApplication() {
  // name is used to specify the unique identifier of the project
  // used to distinguish between different project preference settings, storage data key prefix, and other data that needs to be isolated
  const env = import.meta.env.PROD ? 'prod' : 'dev';
  const appVersion = import.meta.env.VITE_APP_VERSION;
  const namespace = `${import.meta.env.VITE_APP_NAMESPACE}-${appVersion}-${env}`;

  // app preference initialization
  await initPreferences({
    extension: preferencesExtension,
    namespace,
    overrides: overridesPreferences,
  });

  // startup and mount application
  // vue application main logic and view
  const { bootstrap } = await import('./bootstrap');
  await bootstrap(namespace);

  // remove and destroy loading
  unmountGlobalLoading();
}

initApplication();
