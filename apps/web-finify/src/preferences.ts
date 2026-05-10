import {
  defineOverridesPreferences,
  definePreferencesExtension,
} from '@vben/preferences';

interface WebAntdPreferencesExtension {
  defaultTableSize: number;
  enableFormFullscreen: boolean;
  reportTitle: string;
  tenantMode: 'multi' | 'single';
}

/**
 * @description Project configuration file
 * only need to override some of the configuration in the project,
 * do not need to override the configuration that is not needed,
 * it will automatically use the default configuration
 * !!! after changing the configuration, please clear the cache, otherwise it may not take effect
 */
export const overridesPreferences = defineOverridesPreferences({
  // overrides
  app: {
    name: import.meta.env.VITE_APP_TITLE,
  },
});

export const preferencesExtension =
  definePreferencesExtension<WebAntdPreferencesExtension>({
    tabLabel: 'preferences.antd.tabLabel',
    title: 'preferences.antd.title',
    fields: [
      {
        component: 'switch',
        defaultValue: true,
        key: 'enableFormFullscreen',
        label: 'preferences.antd.fields.enableFormFullscreen.label',
        tip: 'preferences.antd.fields.enableFormFullscreen.tip',
      },
      {
        component: 'select',
        defaultValue: 'single',
        key: 'tenantMode',
        label: 'preferences.antd.fields.tenantMode.label',
        options: [
          {
            label: 'preferences.antd.fields.tenantMode.options.single.label',
            value: 'single',
          },
          {
            label: 'preferences.antd.fields.tenantMode.options.multi.label',
            value: 'multi',
          },
        ],
      },
      {
        component: 'number',
        componentProps: {
          max: 200,
          min: 10,
          step: 10,
        },
        defaultValue: 20,
        key: 'defaultTableSize',
        label: 'preferences.antd.fields.defaultTableSize.label',
      },
      {
        component: 'input',
        defaultValue: '',
        key: 'reportTitle',
        label: 'preferences.antd.fields.reportTitle.label',
        placeholder: 'preferences.antd.fields.reportTitle.placeholder',
      },
      {
        "app": {
          "locale": "pt-BR"
        },
        "breadcrumb": {
          "showHome": true,
          "styleType": "background"
        },
        "copyright": {
          "companyName": "Finify",
          "companySiteLink": "https://www.finify.com.br",
          "date": "2026"
        },
        "footer": {
          "enable": true
        },
        "sidebar": {
          "expandOnHover": false
        },
        "tabbar": {
          "maxCount": 10,
          "middleClickToClose": true
        },
        "theme": {
          "mode": "auto"
        },
        "widget": {
          "sidebarToggle": false,
          "themeToggle": false,
          "timezone": false
        }
      }
    ],
  });
