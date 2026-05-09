<script setup lang="ts">
import { computed } from 'vue';

import { Page, SliderRotateCaptcha } from '@vben/common-ui';
import { preferences } from '@vben/preferences';
import { useUserStore } from '@vben/stores';

import { Card, message } from 'ant-design-vue';

const userStore = useUserStore();
function handleSuccess() {
  message.success('success!');
}

const avatar = computed(() => {
  return userStore.userInfo?.avatar || preferences.app.defaultAvatar;
});
</script>

<template>
  <Page
    description="Used for simple drag-and-drop validation scenarios on the front end."
    title="Slider rotate verification"
  >
    <Card class="mb-5" title="Basic example">
      <div class="flex-center p-4">
        <SliderRotateCaptcha :src="avatar" @success="handleSuccess" />
      </div>
    </Card>
  </Page>
</template>
