<script lang="ts" setup>
import { Fallback } from '@vben/common-ui';
</script>

<template>
  <Fallback
    :description="`Current route: ${String($route.name)}, submenu is not visible`"
    status="coming-soon"
    title="Hidden Submenu"
  >
    <template #action>
      <RouterLink to="/demos/features/hide-menu-children/children">
        Open Subroute
      </RouterLink>
    </template>
  </Fallback>
</template>
