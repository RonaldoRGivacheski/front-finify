<script lang="ts" setup>
import { onBeforeUnmount } from 'vue';

import {
  alert,
  clearAllAlerts,
  confirm,
  Page,
  prompt,
  useVbenModal,
} from '@vben/common-ui';

import { Button, Card, Flex, message } from 'ant-design-vue';

import DocButton from '../doc-button.vue';
import AutoHeightDemo from './auto-height-demo.vue';
import BaseDemo from './base-demo.vue';
import BlurDemo from './blur-demo.vue';
import DragDemo from './drag-demo.vue';
import DynamicDemo from './dynamic-demo.vue';
import FormModalDemo from './form-modal-demo.vue';
import InContentModalDemo from './in-content-demo.vue';
import NestedDemo from './nested-demo.vue';
import SharedDataDemo from './shared-data-demo.vue';

defineOptions({ name: 'ModalExample' });

const [BaseModal, baseModalApi] = useVbenModal({
  // Connection of the separated component
  connectedComponent: BaseDemo,
});

const [InContentModal, inContentModalApi] = useVbenModal({
  // Connection of the separated component
  connectedComponent: InContentModalDemo,
});

const [AutoHeightModal, autoHeightModalApi] = useVbenModal({
  connectedComponent: AutoHeightDemo,
});

const [DragModal, dragModalApi] = useVbenModal({
  connectedComponent: DragDemo,
});

const [DynamicModal, dynamicModalApi] = useVbenModal({
  connectedComponent: DynamicDemo,
});

const [SharedDataModal, sharedModalApi] = useVbenModal({
  connectedComponent: SharedDataDemo,
});

const [FormModal, formModalApi] = useVbenModal({
  connectedComponent: FormModalDemo,
});

const [NestedModal, nestedModalApi] = useVbenModal({
  connectedComponent: NestedDemo,
});

const [BlurModal, blurModalApi] = useVbenModal({
  connectedComponent: BlurDemo,
});

function openBaseModal() {
  baseModalApi.open();
}

function openInContentModal() {
  inContentModalApi.open();
}

function openAutoHeightModal() {
  autoHeightModalApi.open();
}

function openDragModal() {
  dragModalApi.open();
}

function openDynamicModal() {
  dynamicModalApi.open();
}

function openSharedModal() {
  sharedModalApi
    .setData({
      content: 'External data content',
      payload: 'External data payload',
    })
    .open();
}

function openNestedModal() {
  nestedModalApi.open();
}

function openBlurModal() {
  blurModalApi.open();
}

function handleUpdateTitle() {
  dynamicModalApi.setState({ title: 'Internal dynamic title' }).open();
}

function openFormModal() {
  formModalApi
    .setData({
      // 表单值
      values: { field1: 'abc', field2: '123' },
    })
    .open();
}

function openAlert() {
  alert({
    content: 'This is a popup',
    icon: 'success',
  }).then(() => {
    message.info('User closed the popup');
  });
}

onBeforeUnmount(() => {
  // Clear all popups
  clearAllAlerts();
});

function openConfirm() {
  confirm({
    beforeClose({ isConfirm }) {
      if (!isConfirm) return;
      // 这里可以做一些异步操作
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 1000);
      });
    },
    centered: false,
    content: 'This is a confirmation popup',
    icon: 'question',
  })
    .then(() => {
      message.success('User confirmed the operation');
    })
    .catch(() => {
      message.error('User cancelled the operation');
    });
}

async function openPrompt() {
  prompt<string>({
    async beforeClose({ isConfirm, value }) {
      if (isConfirm && value === 'cheese') {
        message.error('Cannot eat cheese');
        return false;
      }
    },
    componentProps: { placeholder: 'Cannot eat cheese...' },
    content: 'What did you eat for lunch?',
    icon: 'question',
    overlayBlur: 3,
  })
    .then((res) => {
      message.success(`User entered: ${res}`);
    })
    .catch(() => {
      message.error('User cancelled the input');
    });
}
</script>

<template>
  <Page
    auto-content-height
    description="Modal component is often used to display additional information, forms, or operation prompts without leaving the current page. For more APIs, please refer to the component documentation."
    title="Modal component example"
  >
    <template #extra>
      <DocButton path="/components/common-ui/vben-modal" />
    </template>
    <BaseModal />
    <InContentModal />
    <AutoHeightModal />
    <DragModal />
    <DynamicModal />
    <SharedDataModal />
    <FormModal />
    <NestedModal />
    <BlurModal />
    <Flex wrap="wrap" class="w-full" gap="10">
      <Card class="w-75" title="Basic usage">
        <p>A basic modal example</p>
        <template #actions>
          <Button type="primary" @click="openBaseModal">Open modal</Button>
        </template>
      </Card>

      <Card
        class="w-75"
        title="Specified container + not destroyed after closing"
      >
        <p>Example of opening a modal in the content area</p>
        <template #actions>
          <Button type="primary" @click="openInContentModal">Open modal</Button>
        </template>
      </Card>

      <Card class="w-75" title="Content height adaptive">
        <p>
          Can be adjusted according to the content and automatically adjust the
          height
        </p>
        <template #actions>
          <Button type="primary" @click="openAutoHeightModal">
            Open modal
          </Button>
        </template>
      </Card>

      <Card class="w-75" title="Draggable example">
        <p>Configure draggable to enable drag and drop</p>
        <template #actions>
          <Button type="primary" @click="openDragModal">Open modal</Button>
        </template>
      </Card>

      <Card class="w-75" title="Dynamic configuration example">
        <p>Configure dynamic adjustment of modal data through setState</p>
        <template #extra>
          <Button type="link" @click="openDynamicModal">Open modal</Button>
        </template>
        <template #actions>
          <Button type="primary" @click="handleUpdateTitle">
            External modification title and open
          </Button>
        </template>
      </Card>

      <Card class="w-75" title="Shared data example">
        <p>Use sharedData for data interaction</p>
        <template #actions>
          <Button type="primary" @click="openSharedModal">
            Open modal and pass data
          </Button>
        </template>
      </Card>

      <Card class="w-75" title="Form modal example">
        <p>Combine modal and form</p>
        <template #actions>
          <Button type="primary" @click="openFormModal">
            Open form modal
          </Button>
        </template>
      </Card>

      <Card class="w-75" title="Nested modal example">
        <p>Open another modal within an already open modal</p>
        <template #actions>
          <Button type="primary" @click="openNestedModal">
            Open nested modal
          </Button>
        </template>
      </Card>

      <Card class="w-75" title="Mask blur example">
        <p>Apply a glass-like blur effect to the mask</p>
        <template #actions>
          <Button type="primary" @click="openBlurModal">Open modal</Button>
        </template>
      </Card>
      <Card class="w-75" title="Lightweight prompt modal">
        <template #extra>
          <DocButton path="/components/common-ui/vben-alert" />
        </template>
        <p>
          Create dynamic prompt modals through quick methods, suitable for some
          lightweight prompts, confirmations, and inputs.
        </p>
        <template #actions>
          <Button type="primary" @click="openAlert">Alert</Button>
          <Button type="primary" @click="openConfirm">Confirm</Button>
          <Button type="primary" @click="openPrompt">Prompt</Button>
        </template>
      </Card>
    </Flex>
  </Page>
</template>
