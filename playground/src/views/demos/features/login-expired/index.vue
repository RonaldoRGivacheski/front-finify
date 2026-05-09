<script lang="ts" setup>
import type { LoginExpiredModeType } from '@vben/types';

import { Page } from '@vben/common-ui';
import { preferences, updatePreferences } from '@vben/preferences';

import { Button, Card } from 'ant-design-vue';

import { getMockStatusApi } from '#/api';

async function handleClick(type: LoginExpiredModeType) {
  const loginExpiredMode = preferences.app.loginExpiredMode;

  updatePreferences({ app: { loginExpiredMode: type } });
  await getMockStatusApi('401');
  updatePreferences({ app: { loginExpiredMode } });
}
</script>

<template>
  <Page title="Login Expired Demo">
    <template #description>
      <div class="mt-2 text-foreground/80">
        When an interface request encounters a 401 status code, you need to log
        in again. There are two ways:
        <p>
          1. Redirect to the login page, and jump back to the original page
          after successful login
        </p>
        <p>
          2. Pop up a relogin dialog, close the dialog after login, and do not
          perform any page jumps (it will still jump to the login page after
          refresh)
        </p>
      </div>
    </template>

    <Card class="mb-5" title="Redirect to the login page">
      <Button type="primary" @click="handleClick('page')">
        Click to trigger
      </Button>
    </Card>
    <Card class="mb-5" title="Login dialog method">
      <Button type="primary" @click="handleClick('modal')">
        Click to trigger
      </Button>
    </Card>
  </Page>
</template>
