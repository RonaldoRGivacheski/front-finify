<script lang="ts" setup>
import { Loading, Page, Spinner } from '@vben/common-ui';
import { IconifyIcon } from '@vben/icons';

import { refAutoReset } from '@vueuse/core';
import { Button, Card, Spin } from 'ant-design-vue';

const spinning = refAutoReset(false, 3000);
const loading = refAutoReset(false, 3000);

const spinningV = refAutoReset(false, 3000);
const loadingV = refAutoReset(false, 3000);
</script>
<template>
  <Page
    title="Vben Loading"
    description="Loading is a component for displaying loading states. It can add a loading overlay to other container components. When using them, the container needs to be relatively positioned."
  >
    <Card title="Antd Spin">
      <template #actions>
        This is a demonstration of the Spin component provided by the Antd
        component library.
      </template>
      <Spin :spinning="spinning" tip="Loading...">
        <Button type="primary" @click="spinning = true">Show Spin</Button>
      </Spin>
    </Card>

    <Card title="Vben Loading" v-loading="loadingV" class="mt-4">
      <template #extra>
        <Button type="primary" @click="loadingV = true">
          v-loading Directive
        </Button>
      </template>
      <template #actions>
        The Loading component can set text and also provides an icon slot for
        replacing the loading icon.
      </template>
      <div class="flex gap-4">
        <div class="size-40">
          <Loading
            :spinning="loading"
            text="Loading..."
            class="flex-center size-full"
          >
            <Button type="primary" @click="loading = true">
              Default animation
            </Button>
          </Loading>
        </div>
        <div class="size-40">
          <Loading :spinning="loading" class="flex-center size-full">
            <Button type="primary" @click="loading = true">
              Custom animation 1
            </Button>
            <template #icon>
              <IconifyIcon
                icon="svg-spinners:ring-resize"
                class="size-10 text-primary"
              />
            </template>
          </Loading>
        </div>
        <div class="size-40">
          <Loading :spinning="loading" class="flex-center size-full">
            <Button type="primary" @click="loading = true">
              Custom animation 2
            </Button>
            <template #icon>
              <IconifyIcon
                icon="svg-spinners:bars-scale"
                class="size-10 text-primary"
              />
            </template>
          </Loading>
        </div>
      </div>
    </Card>

    <Card
      title="Vben Spinner"
      v-spinning="spinningV"
      class="mt-4 overflow-hidden"
      :body-style="{
        position: 'relative',
        overflow: 'hidden',
      }"
    >
      <template #extra>
        <Button type="primary" @click="spinningV = true">
          v-spinning Directive
        </Button>
      </template>
      <template #actions>
        The Spinner component is a special case of the Loading component, and it
        has only one fixed, uniform style.
      </template>
      <Spinner :spinning="spinning" class="flex-center size-40">
        <Button type="primary" @click="spinning = true">显示Spinner</Button>
      </Spinner>
    </Card>
  </Page>
</template>
