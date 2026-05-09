import {
  defineOverridesPreferences,
  definePreferencesExtension,
} from '@vben/preferences';

interface PlaygroundPreferencesExtension {
  defaultVisibleRows: number;
  enableQuickActions: boolean;
  highlightTone: 'default' | 'success' | 'warning';
  reportTitle: string;
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

export type { PlaygroundPreferencesExtension };

export const preferencesExtension =
  definePreferencesExtension<PlaygroundPreferencesExtension>({
    tabLabel: 'demos.preferencesExtensionConfig.tabLabel',
    title: 'demos.preferencesExtensionConfig.title',
    fields: [
      {
        component: 'input',
        defaultValue: '',
        key: 'reportTitle',
        label: 'demos.preferencesExtensionConfig.fields.reportTitle.label',
        placeholder:
          'demos.preferencesExtensionConfig.fields.reportTitle.placeholder',
      },
      {
        component: 'number',
        componentProps: {
          max: 8,
          min: 1,
          step: 1,
        },
        defaultValue: 4,
        key: 'defaultVisibleRows',
        label:
          'demos.preferencesExtensionConfig.fields.defaultVisibleRows.label',
        tip: 'demos.preferencesExtensionConfig.fields.defaultVisibleRows.tip',
      },
      {
        component: 'switch',
        defaultValue: true,
        key: 'enableQuickActions',
        label:
          'demos.preferencesExtensionConfig.fields.enableQuickActions.label',
      },
      {
        component: 'select',
        defaultValue: 'default',
        key: 'highlightTone',
        label: 'demos.preferencesExtensionConfig.fields.highlightTone.label',
        options: [
          {
            label:
              'demos.preferencesExtensionConfig.fields.highlightTone.options.default',
            value: 'default',
          },
          {
            label:
              'demos.preferencesExtensionConfig.fields.highlightTone.options.success',
            value: 'success',
          },
          {
            label:
              'demos.preferencesExtensionConfig.fields.highlightTone.options.warning',
            value: 'warning',
          },
        ],
      },
      {
        app: {
          locale: 'pt-BR',
        },
        breadcrumb: {
          showHome: true,
          styleType: 'background',
        },
        copyright: {
          companyName: 'Finify',
          companySiteLink: 'https://www.finify.com.br',
          date: '2026',
        },
        footer: {
          enable: true,
        },
        sidebar: {
          collapsedButton: false,
        },
        tabbar: {
          maxCount: 10,
          middleClickToClose: true,
        },
        theme: {
          mode: 'auto',
        },
        widget: {
          sidebarToggle: false,
          themeToggle: false,
          timezone: false,
        },
      },
    ],
  });
