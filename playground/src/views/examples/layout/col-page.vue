<script lang="ts" setup>
import { reactive, ref } from 'vue';

import { ColPage } from '@vben/common-ui';
import { IconifyIcon } from '@vben/icons';

import {
  Alert,
  Button,
  Card,
  Checkbox,
  Slider,
  Tag,
  Tooltip,
} from 'ant-design-vue';

const props = reactive({
  leftCollapsedWidth: 5,
  leftCollapsible: true,
  leftMaxWidth: 50,
  leftMinWidth: 20,
  leftWidth: 30,
  resizable: true,
  rightWidth: 70,
  splitHandle: true,
  splitLine: true,
});
const leftMinWidth = ref(props.leftMinWidth || 1);
const leftMaxWidth = ref(props.leftMaxWidth || 100);
</script>
<template>
  <ColPage
    auto-content-height
    description="ColPage is a two-column layout component that supports left-side collapse, drag-to-adjust width, and other functions."
    v-bind="props"
    title="ColPage Two-column layout component"
  >
    <template #title>
      <span class="mr-2 text-2xl font-bold">ColPage Two-column layout component</span>
      <Tag color="hsl(var(--destructive))">Alpha</Tag>
    </template>
    <template #left="{ isCollapsed, expand }">
      <div v-if="isCollapsed" @click="expand">
        <Tooltip title="Click to expand the left side">
          <Button shape="circle" type="primary" class="flex-center">
            <template #icon>
              <IconifyIcon class="text-2xl" icon="bi:arrow-right" />
            </template>
          </Button>
        </Tooltip>
      </div>
      <div
        v-else
        :style="{ minWidth: '200px' }"
        class="mr-2 rounded-(--radius) border border-border bg-card p-2"
      >
        <p>Content on the left side</p>
        <p>Content on the left side</p>
        <p>Content on the left side</p>
        <p>Content on the left side</p>
        <p>Content on the left side</p>
      </div>
    </template>
    <Card class="ml-2" title="Basic Usage">
      <div class="flex flex-col gap-2">
        <div class="flex gap-2">
          <Checkbox v-model="props.resizable">
            Draggable to adjust width
          </Checkbox>
          <Checkbox v-model="props.splitLine">
            Show drag separator line
          </Checkbox>
          <Checkbox v-model="props.splitHandle">Show drag handle</Checkbox>
          <Checkbox v-model="props.leftCollapsible">Left collapsible</Checkbox>
        </div>
        <div class="flex items-center gap-2">
          <span>Percentage of minimum width of left side:</span>
          <Slider
            v-model:value="leftMinWidth"
            :max="props.leftMaxWidth - 1"
            :min="1"
            class="w-25"
            @after-change="(value) => (props.leftMinWidth = value as number)"
          />
          <span>Percentage of maximum width of left side:</span>
          <Slider
            v-model:value="props.leftMaxWidth"
            :max="100"
            :min="leftMaxWidth + 1"
            class="w-25"
            @after-change="(value) => (props.leftMaxWidth = value as number)"
          />
        </div>
        <Alert message="Experimental component" show-icon type="warning">
          <template #description>
            <p>
              The two-column layout component is a relatively basic layout
              component extended on the basis of the Page component. It supports
              left-side collapse (when the dragged left-side width is smaller
              than the minimum width, it can enter the collapsed state),
              drag-to-adjust width, and other functions.
            </p>
            <p>
              The above width settings are percentages, with a minimum value of
              1 and a maximum value of 100.
            </p>
            <p class="font-bold text-red-600">
              This is an experimental component, and its usage may change or it
              may not be adopted in the end. It is not recommended for use in
              production environments until its usage is officially documented.
            </p>
          </template>
        </Alert>
      </div>
    </Card>
  </ColPage>
</template>
