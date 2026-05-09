<script lang="ts" setup>
import type { Recordable } from '@vben/types';

import { useRouter } from 'vue-router';

import { AccessControl, useAccess } from '@vben/access';
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

const { accessMode, hasAccessByCodes } = useAccess();
const authStore = useAuthStore();
const userStore = useUserStore();
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
    await authStore.authLogin(account, async () => {
      router.go(0);
    });
  }
}
</script>

<template>
  <Page
    :title="`${accessMode === 'frontend' ? 'Frontend' : 'Backend'} Button Access Control Demo`"
    description="Switch between different accounts to observe button changes."
  >
    <Card class="mb-5">
      <template #title>
        <span class="font-semibold">Current Role:</span>
        <span class="mx-4 text-lg text-primary">
          {{ userStore.userRoles?.[0] }}
        </span>
      </template>

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

    <Card class="mb-5" title="Component Control - Permission Code">
      <AccessControl :codes="['AC_100100']" type="code">
        <Button class="mr-4"> Super Account Visible ["AC_100100"] </Button>
      </AccessControl>
      <AccessControl :codes="['AC_100030']" type="code">
        <Button class="mr-4"> Admin Account Visible ["AC_100030"] </Button>
      </AccessControl>
      <AccessControl :codes="['AC_1000001']" type="code">
        <Button class="mr-4"> User Account Visible ["AC_1000001"] </Button>
      </AccessControl>
      <AccessControl :codes="['AC_100100', 'AC_100030']" type="code">
        <Button class="mr-4">
          Super & Admin Account Visible ["AC_100100","AC_100030"]
        </Button>
      </AccessControl>
    </Card>

    <Card
      v-if="accessMode === 'frontend'"
      class="mb-5"
      title="Component Control - Role"
    >
      <AccessControl :codes="['super']" type="role">
        <Button class="mr-4"> Super Role Visible </Button>
      </AccessControl>
      <AccessControl :codes="['admin']" type="role">
        <Button class="mr-4"> Admin Role Visible </Button>
      </AccessControl>
      <AccessControl :codes="['user']" type="role">
        <Button class="mr-4"> User Role Visible </Button>
      </AccessControl>
      <AccessControl :codes="['super', 'admin']" type="role">
        <Button class="mr-4"> Super & Admin Role Visible </Button>
      </AccessControl>
    </Card>

    <Card class="mb-5" title="Function Control">
      <Button v-if="hasAccessByCodes(['AC_100100'])" class="mr-4">
        Super Account Visible ["AC_100100"]
      </Button>
      <Button v-if="hasAccessByCodes(['AC_100030'])" class="mr-4">
        Admin Account Visible ["AC_100030"]
      </Button>
      <Button v-if="hasAccessByCodes(['AC_1000001'])" class="mr-4">
        User Account Visible ["AC_1000001"]
      </Button>
      <Button v-if="hasAccessByCodes(['AC_100100', 'AC_100030'])" class="mr-4">
        Super & Admin Account Visible ["AC_100100","AC_100030"]
      </Button>
    </Card>

    <Card class="mb-5" title="Instruction Control - Permission Code">
      <Button class="mr-4" v-access:code="['AC_100100']">
        Super Account Visible ["AC_100100"]
      </Button>
      <Button class="mr-4" v-access:code="['AC_100030']">
        Admin Account Visible ["AC_100030"]
      </Button>
      <Button class="mr-4" v-access:code="['AC_1000001']">
        User Account Visible ["AC_1000001"]
      </Button>
      <Button class="mr-4" v-access:code="['AC_100100', 'AC_100030']">
        Super & Admin Account Visible ["AC_100100","AC_100030"]
      </Button>
    </Card>

    <Card
      v-if="accessMode === 'frontend'"
      class="mb-5"
      title="Instruction Control - Role"
    >
      <Button class="mr-4" v-access:role="['super']">
        Super Role Visible
      </Button>
      <Button class="mr-4" v-access:role="['admin']">
        Admin Role Visible
      </Button>
      <Button class="mr-4" v-access:role="['user']"> User Role Visible </Button>
      <Button class="mr-4" v-access:role="['super', 'admin']">
        Super & Admin Role Visible
      </Button>
    </Card>
  </Page>
</template>
