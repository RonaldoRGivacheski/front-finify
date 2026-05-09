<script lang="ts" setup>
import { useVbenDrawer } from '@vben/common-ui';

import { Button, message } from 'ant-design-vue';

const [Drawer, drawerApi] = useVbenDrawer({
  onCancel() {
    drawerApi.close();
  },
  onConfirm() {
    message.info('onConfirm');
    // drawerApi.close();
  },
  title: 'Dynamic Configuration Update Example',
});

// const state = drawerApi.useStore();

function handleUpdateTitle() {
  drawerApi.setState({ title: '内部动态标题' });
}
</script>
<template>
  <Drawer>
    <div class="flex-col-center">
      <Button class="mb-3" type="primary" @click="handleUpdateTitle()">
        Dynamic Title Update
      </Button>
    </div>
  </Drawer>
</template>
