import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:landmark',
      order: 3,
      title: $t('page.financial.title'),
    },
    name: 'Financial',
    path: '/financial',
    children: [
      {
        name: 'Bank',
        path: '/financial/bank',
        component: () => import('#/views/financial/bank/index.vue'),
        meta: {
          icon: 'lucide:building-2',
          title: $t('page.financial.bank'),
          authority: ['financial-bank_view'],
        },
      },
    ],
  },
];

export default routes;
