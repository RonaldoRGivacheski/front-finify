<script lang="ts" setup>
import { useRouter } from 'vue-router';

import { Fallback } from '@vben/common-ui';

import { Button } from 'ant-design-vue';

const router = useRouter();
</script>

<template>
  <Fallback
    description="Breadcrumb Navigation - Parallel Mode - Details Page"
    status="coming-soon"
    title="Pay attention to the changes in the breadcrumb navigation"
  >
    <template #action>
      <Button @click="router.go(-1)">Back</Button>
    </template>
  </Fallback>
</template>
