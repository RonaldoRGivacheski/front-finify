<script setup lang="ts">
import { computed } from 'vue';

import { ProfileNotificationSetting } from '@vben/common-ui';

const formSchema = computed(() => {
  return [
    {
      value: true,
      fieldName: 'accountPassword',
      label: 'Account Password',
      description:
        "Other users' messages will be notified in the form of site messages",
    },
    {
      value: true,
      fieldName: 'systemMessage',
      label: 'System Message',
      description:
        "Other users' messages will be notified in the form of site messages",
    },
    {
      value: true,
      fieldName: 'todoTask',
      label: 'To-Do Task',
      description:
        "Other users' messages will be notified in the form of site messages",
    },
  ];
});
</script>
<template>
  <ProfileNotificationSetting :form-schema="formSchema" />
</template>
