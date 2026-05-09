<script lang="ts" setup>
import { useVbenModal } from '@vben/common-ui';

import { Button, message } from 'ant-design-vue';

const [Modal, modalApi] = useVbenModal({
  onCancel() {
    modalApi.close();
  },
  onClosed() {
    message.info('onClosed: Closing animation ended');
  },
  onConfirm() {
    message.info('onConfirm');
    // modalApi.close();
  },
  onOpened() {
    message.info('onOpened: Opening animation ended');
  },
});

function lockModal() {
  modalApi.lock();
  setTimeout(() => {
    modalApi.unlock();
  }, 3000);
}
</script>
<template>
  <Modal
    class="w-150"
    title="Basic Modal Example"
    title-tooltip="Title tooltip content"
  >
    base demo
    <Button type="primary" @click="lockModal">Lock modal</Button>
  </Modal>
</template>
