<script setup lang="ts">
import { computed } from 'vue';

import { ProfileSecuritySetting } from '@vben/common-ui';

const formSchema = computed(() => {
  return [
    {
      value: true,
      fieldName: 'accountPassword',
      label: 'Account Password',
      description: 'Current password strength: strong',
    },
    {
      value: true,
      fieldName: 'securityPhone',
      label: 'Security Phone',
      description: 'Mobile phone number already linked: 138****8293',
    },
    {
      value: true,
      fieldName: 'securityQuestion',
      label: 'Security Question',
      description:
        'No security questions have been set, which can effectively protect account security',
    },
    {
      value: true,
      fieldName: 'securityEmail',
      label: 'Backup Email',
      description: 'Email already linked: ant***sign.com',
    },
    {
      value: false,
      fieldName: 'securityMfa',
      label: 'MFA Device',
      description:
        'No MFA device has been bound. After binding, you can carry out secondary confirmation',
    },
  ];
});
</script>
<template>
  <ProfileSecuritySetting :form-schema="formSchema" />
</template>
