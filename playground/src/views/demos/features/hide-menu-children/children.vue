<script lang="ts" setup>
import { Fallback, VbenButton } from '@vben/common-ui';
import { useTabs } from '@vben/hooks';
import { X } from '@vben/icons';

const { closeCurrentTab } = useTabs();
</script>

<template>
  <Fallback
    description="The current route is not visible in the menu"
    status="coming-soon"
    title="Hidden Submenu"
    show-back
  >
    <template #action>
      <VbenButton size="lg" @click="closeCurrentTab()">
        <X class="mr-2 size-4" />
        Close Current Tab
      </VbenButton>
    </template>
  </Fallback>
</template>
