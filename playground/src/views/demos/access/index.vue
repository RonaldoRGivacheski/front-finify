<script lang="ts" setup>
import type { Recordable } from '@vben/types';

import { useRouter } from 'vue-router';

import { useAccess } from '@vben/access';
import { Page } from '@vben/common-ui';
import { resetAllStores, useUserStore } from '@vben/stores';

import { Button, Card } from 'ant-design-vue';

import { useAuthStore } from '#/store';

const accounts: Record<string, Recordable<any>> = {
  admin: {
    password: '123456',
    username: 'admin',
  },
  super: {
    password: '123456',
    username: 'vben',
  },
  user: {
    password: '123456',
    username: 'jack',
  },
};

const { accessMode, toggleAccessMode } = useAccess();
const userStore = useUserStore();
const accessStore = useAuthStore();
const router = useRouter();

function roleButtonType(role: string) {
  return userStore.userRoles.includes(role) ? 'primary' : 'default';
}

async function changeAccount(role: string) {
  if (userStore.userRoles.includes(role)) {
    return;
  }

  const account = accounts[role];
  resetAllStores();
  if (account) {
    await accessStore.authLogin(account, async () => {
      router.go(0);
    });
  }
}

async function handleToggleAccessMode() {
  if (!accounts.super) {
    return;
  }
  await toggleAccessMode();
  resetAllStores();

  await accessStore.authLogin(accounts.super, async () => {
    setTimeout(() => {
      router.go(0);
    }, 150);
  });
}
</script>

<template>
  <Page
    :title="`${accessMode === 'frontend' ? 'Frontend' : 'Backend'} Page Access Permission Demo`"
    description="Switch to different accounts to observe changes in the left-side menu."
  >
    <Card class="mb-5" title="Permission Mode">
      <span class="font-semibold">Current Permission Mode:</span>
      <span class="mx-4 text-primary">{{
        accessMode === 'frontend'
          ? 'Frontend Permission Control'
          : 'Backend Permission Control'
      }}</span>
      <Button type="primary" @click="handleToggleAccessMode">
        Switch to
        {{ accessMode === 'frontend' ? 'Backend' : 'Frontend' }} Permission Mode
      </Button>
    </Card>
    <Card title="Account Switch">
      <Button :type="roleButtonType('super')" @click="changeAccount('super')">
        Switch to Super Account
      </Button>

      <Button
        :type="roleButtonType('admin')"
        class="mx-4"
        @click="changeAccount('admin')"
      >
        Switch to Admin Account
      </Button>
      <Button :type="roleButtonType('user')" @click="changeAccount('user')">
        Switch to User Account
      </Button>
    </Card>
  </Page>
</template>
