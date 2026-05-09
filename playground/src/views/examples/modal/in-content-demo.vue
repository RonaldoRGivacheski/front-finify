<script lang="ts" setup>
import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { Input, message } from 'ant-design-vue';

const [Modal, modalApi] = useVbenModal({
  destroyOnClose: false,
  onCancel() {
    modalApi.close();
  },
  onConfirm() {
    message.info('onConfirm');
    // modalApi.close();
  },
});
const value = ref();
</script>
<template>
  <Modal
    append-to-main
    class="w-150"
    title="In-content modal example"
    title-tooltip="Title tooltip content"
  >
    This modal is specified to open in the content area, and its content will
    not be destroyed after closing
    <Input v-model:value="value" placeholder="KeepAlive test" />
  </Modal>
</template>
