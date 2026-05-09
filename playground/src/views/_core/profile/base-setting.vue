<script setup lang="ts">
import type { BasicOption } from '@vben/types';

import type { VbenFormSchema } from '#/adapter/form';

import { computed, onMounted, ref } from 'vue';

import { ProfileBaseSetting } from '@vben/common-ui';

import { getUserInfoApi } from '#/api';

const profileBaseSettingRef = ref();

const MOCK_ROLES_OPTIONS: BasicOption[] = [
  {
    label: 'Super Admin',
    value: 'super',
  },
  {
    label: 'User',
    value: 'user',
  },
  {
    label: 'Test',
    value: 'test',
  },
];

const formSchema = computed((): VbenFormSchema[] => {
  return [
    {
      fieldName: 'realName',
      component: 'Input',
      label: 'Name',
    },
    {
      fieldName: 'username',
      component: 'Input',
      label: 'Username',
    },
    {
      fieldName: 'roles',
      component: 'Select',
      componentProps: {
        mode: 'tags',
        options: MOCK_ROLES_OPTIONS,
      },
      label: 'Role',
    },
    {
      fieldName: 'introduction',
      component: 'Textarea',
      label: 'Introduction',
    },
  ];
});

onMounted(async () => {
  const data = await getUserInfoApi();
  profileBaseSettingRef.value.getFormApi().setValues(data);
});
</script>
<template>
  <ProfileBaseSetting ref="profileBaseSettingRef" :form-schema="formSchema" />
</template>
