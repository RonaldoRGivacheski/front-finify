<script setup lang="ts">
import type { VbenFormSchema } from '#/adapter/form';

import { computed } from 'vue';

import { ProfilePasswordSetting, z } from '@vben/common-ui';

import { message } from 'ant-design-vue';

const formSchema = computed((): VbenFormSchema[] => {
  return [
    {
      fieldName: 'oldPassword',
      label: 'Old Password',
      component: 'VbenInputPassword',
      componentProps: {
        placeholder: 'Please enter the old password',
      },
    },
    {
      fieldName: 'newPassword',
      label: 'New Password',
      component: 'VbenInputPassword',
      componentProps: {
        passwordStrength: true,
        placeholder: 'Please enter the new password',
      },
    },
    {
      fieldName: 'confirmPassword',
      label: 'Confirm Password',
      component: 'VbenInputPassword',
      componentProps: {
        passwordStrength: true,
        placeholder: 'Please enter the new password',
      },
      dependencies: {
        rules(values) {
          const { newPassword } = values;
          return z
            .string({ required_error: 'Please enter the new password again' })
            .min(1, { message: 'Please enter the new password again' })
            .refine((value) => value === newPassword, {
              message: 'The two passwords entered are inconsistent',
            });
        },
        triggerFields: ['newPassword'],
      },
    },
  ];
});

function handleSubmit() {
  message.success('Password modified successfully');
}
</script>
<template>
  <ProfilePasswordSetting
    class="w-1/3"
    :form-schema="formSchema"
    @submit="handleSubmit"
  />
</template>
