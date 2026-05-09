<script lang="ts" setup>
import type { DrawerPlacement, DrawerState } from '@vben/common-ui';

import { Page, useVbenDrawer } from '@vben/common-ui';

import { Button, Card } from 'ant-design-vue';

import DocButton from '../doc-button.vue';
import AutoHeightDemo from './auto-height-demo.vue';
import BaseDemo from './base-demo.vue';
import DynamicDemo from './dynamic-demo.vue';
import FormDrawerDemo from './form-drawer-demo.vue';
import inContentDemo from './in-content-demo.vue';
import SharedDataDemo from './shared-data-demo.vue';

defineOptions({ name: 'DrawerExample' });
const [BaseDrawer, baseDrawerApi] = useVbenDrawer({
  // Component extracted from drawer
  connectedComponent: BaseDemo,
  // placement: 'left',
});

const [InContentDrawer, inContentDrawerApi] = useVbenDrawer({
  // Component extracted from drawer
  connectedComponent: inContentDemo,
  // placement: 'left',
});

const [AutoHeightDrawer, autoHeightDrawerApi] = useVbenDrawer({
  connectedComponent: AutoHeightDemo,
});

const [DynamicDrawer, dynamicDrawerApi] = useVbenDrawer({
  connectedComponent: DynamicDemo,
});

const [SharedDataDrawer, sharedDrawerApi] = useVbenDrawer({
  connectedComponent: SharedDataDemo,
});

const [FormDrawer, formDrawerApi] = useVbenDrawer({
  connectedComponent: FormDrawerDemo,
});

function openBaseDrawer(placement: DrawerPlacement = 'right') {
  baseDrawerApi.setState({ placement }).open();
}

function openBlurDrawer() {
  baseDrawerApi.setState({ overlayBlur: 5 }).open();
}

function openInContentDrawer(placement: DrawerPlacement = 'right') {
  const state: Partial<DrawerState> = { class: '', placement };
  if (placement === 'top') {
    // The z-index of the top area of the page is only 200, so set a value lower than 200, which is more appropriate when the drawer slides out from the top
    state.zIndex = 199;
  }
  inContentDrawerApi.setState(state).open();
}

function openMaxContentDrawer() {
  // This is just for demonstration purposes. In practice, you can directly write these configurations in the Drawer's attributes.
  inContentDrawerApi.setState({ class: 'w-full', placement: 'right' }).open();
}

function openAutoHeightDrawer() {
  autoHeightDrawerApi.open();
}

function openDynamicDrawer() {
  dynamicDrawerApi.open();
}

function handleUpdateTitle() {
  dynamicDrawerApi.setState({ title: 'External Dynamic Title' }).open();
}

function openSharedDrawer() {
  sharedDrawerApi
    .setData({
      content: 'External passing data content',
      payload: 'External passing data payload',
    })
    .open();
}

function openFormDrawer() {
  formDrawerApi
    .setData({
      // Form values
      values: { field1: 'abc', field2: '123' },
    })
    .open();
}
</script>

<template>
  <Page
    auto-content-height
    description="A drawer component is usually used to display an overlay on the current page to display important information or provide a user interaction interface."
    title="Drawer Component Example"
  >
    <template #extra>
      <DocButton path="/components/common-ui/vben-drawer" />
    </template>
    <BaseDrawer />
    <InContentDrawer />
    <AutoHeightDrawer />
    <DynamicDrawer />
    <SharedDataDrawer />
    <FormDrawer />

    <Card class="mb-4" title="Basic Usage">
      <p class="mb-3">A basic drawer example</p>
      <Button class="mb-2" type="primary" @click="openBaseDrawer('right')">
        Right
      </Button>
      <Button
        class="mb-2 ml-2"
        type="primary"
        @click="openBaseDrawer('bottom')"
      >
        Bottom
      </Button>
      <Button class="mb-2 ml-2" type="primary" @click="openBaseDrawer('left')">
        Left
      </Button>
      <Button class="mb-2 ml-2" type="primary" @click="openBaseDrawer('top')">
        Top
      </Button>
      <Button class="mb-2 ml-2" type="primary" @click="openBlurDrawer">
        Mask Blur Effect
      </Button>
    </Card>

    <Card class="mb-4" title="Open in Content Area">
      <p class="mb-3">
        Specify that the drawer opens in the content area and will not cover the
        top and left menu areas.
      </p>
      <Button class="mb-2" type="primary" @click="openInContentDrawer('right')">
        Right
      </Button>
      <Button
        class="mb-2 ml-2"
        type="primary"
        @click="openInContentDrawer('bottom')"
      >
        Bottom
      </Button>
      <Button
        class="mb-2 ml-2"
        type="primary"
        @click="openInContentDrawer('left')"
      >
        Left
      </Button>
      <Button
        class="mb-2 ml-2"
        type="primary"
        @click="openInContentDrawer('top')"
      >
        Top
      </Button>
      <Button class="mb-2 ml-2" type="primary" @click="openMaxContentDrawer">
        Content Area Full Screen
      </Button>
    </Card>

    <Card class="mb-4" title="Auto Height Content">
      <p class="mb-3">
        The height of the content can be automatically calculated and scrolled.
      </p>
      <Button type="primary" @click="openAutoHeightDrawer">Open Drawer</Button>
    </Card>

    <Card class="mb-4" title="Dynamic Configuration">
      <p class="mb-3">
        The drawer data can be dynamically adjusted through setState.
      </p>
      <Button type="primary" @click="openDynamicDrawer">Open Drawer</Button>
      <Button class="ml-2" type="primary" @click="handleUpdateTitle">
        Update Title and Open
      </Button>
    </Card>

    <Card class="mb-4" title="Shared Data Example">
      <p class="mb-3">Use sharedData for data interaction</p>
      <Button type="primary" @click="openSharedDrawer">
        Open Drawer and Pass Data
      </Button>
    </Card>

    <Card class="mb-4" title="Form Drawer Example">
      <p class="mb-3">Open the drawer and set the form schema and data.</p>
      <Button type="primary" @click="openFormDrawer">
        Open Drawer and Set Form Schema and Data
      </Button>
    </Card>
  </Page>
</template>
