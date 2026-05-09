<script lang="ts" setup>
import type { Recordable } from '@vben/types';

import { reactive, ref } from 'vue';

import {
  Page,
  VbenButton,
  VbenButtonGroup,
  VbenCheckButtonGroup,
} from '@vben/common-ui';
import { LoaderCircle, Square, SquareCheckBig } from '@vben/icons';

import { Button, Card, message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';

const radioValue = ref<string | undefined>('a');
const checkValue = ref(['a', 'b']);

const options = [
  { label: 'Option 1', value: 'a' },
  { label: 'Option 2', value: 'b', num: 999 },
  { label: 'Option 3', value: 'c' },
  { label: 'Option 4', value: 'd' },
  { label: 'Option 5', value: 'e' },
  { label: 'Option 6', value: 'f' },
];

function resetValues() {
  radioValue.value = undefined;
  checkValue.value = [];
}

function beforeChange(v: any, isChecked: boolean) {
  return new Promise((resolve) => {
    message.loading({
      content: `Setting ${v} to ${isChecked ? 'checked' : 'unchecked'}...`,
      duration: 0,
      key: 'beforeChange',
    });
    setTimeout(() => {
      message.success({
        content: `${v} set successfully`,
        key: 'beforeChange',
      });
      resolve(true);
    }, 2000);
  });
}

const compProps = reactive({
  beforeChange: undefined,
  disabled: false,
  gap: 0,
  showIcon: true,
  size: 'middle',
  allowClear: false,
} as Recordable<any>);

const [Form] = useVbenForm({
  handleValuesChange(values) {
    Object.keys(values).forEach((k) => {
      if (k === 'beforeChange') {
        compProps[k] = values[k] ? beforeChange : undefined;
      } else {
        compProps[k] = values[k];
      }
    });
  },
  commonConfig: {
    labelWidth: 150,
  },
  schema: [
    {
      component: 'RadioGroup',
      componentProps: {
        options: [
          { label: 'Large', value: 'large' },
          { label: 'Middle', value: 'middle' },
          { label: 'Small', value: 'small' },
        ],
      },
      defaultValue: compProps.size,
      fieldName: 'size',
      label: 'Size',
    },
    {
      component: 'RadioGroup',
      componentProps: {
        options: [
          { label: 'None', value: 0 },
          { label: 'Small', value: 5 },
          { label: 'Middle', value: 15 },
          { label: 'Large', value: 30 },
        ],
      },
      defaultValue: compProps.gap,
      fieldName: 'gap',
      label: 'Gap',
    },
    {
      component: 'Switch',
      defaultValue: compProps.showIcon,
      fieldName: 'showIcon',
      label: 'Show Icon',
    },
    {
      component: 'Switch',
      defaultValue: compProps.disabled,
      fieldName: 'disabled',
      label: 'Disabled',
    },
    {
      component: 'Switch',
      defaultValue: false,
      fieldName: 'beforeChange',
      label: 'Before Change',
    },
    {
      component: 'Switch',
      defaultValue: false,
      fieldName: 'allowClear',
      label: 'Allow Clear',
      help: 'Does a single selection allow deselection? (Value: undefined)',
    },
    {
      component: 'InputNumber',
      defaultValue: 0,
      fieldName: 'maxCount',
      label: 'Maximum selected quantity',
      help: 'Multiple selections are enabled; 0 represents no limit.',
    },
  ],
  showDefaultActions: false,
  submitOnChange: true,
});

function onBtnClick(value: any) {
  const opt = options.find((o) => o.value === value);
  if (opt) {
    message.success(`Clicked the button ${opt.label}, value = ${value}`);
  }
}
</script>
<template>
  <Page
    title="VbenButtonGroup Button Group"
    description="VbenButtonGroup is a button container used to wrap a group of buttons and coordinate the overall style. VbenCheckButtonGroup can be used as a form component to provide single or multiple selection functions"
  >
    <Card title="Basic Usage">
      <template #extra>
        <Button type="primary" @click="resetValues">Clear Value</Button>
      </template>
      <p class="mt-4">Button Group:</p>
      <div class="mt-2 flex flex-col gap-2">
        <VbenButtonGroup v-bind="compProps" border>
          <VbenButton
            v-for="btn in options"
            :key="btn.value"
            variant="link"
            @click="onBtnClick(btn.value)"
          >
            {{ btn.label }}
          </VbenButton>
        </VbenButtonGroup>
        <VbenButtonGroup v-bind="compProps" border>
          <VbenButton
            v-for="btn in options"
            :key="btn.value"
            variant="outline"
            @click="onBtnClick(btn.value)"
          >
            {{ btn.label }}
          </VbenButton>
        </VbenButtonGroup>
      </div>
      <p class="mt-4">Single selection:{{ radioValue }}</p>
      <div class="mt-2 flex flex-col gap-2">
        <VbenCheckButtonGroup
          v-model="radioValue"
          :options="options"
          v-bind="compProps"
        />
      </div>
      <p class="mt-4">Single selection Slot:{{ radioValue }}</p>
      <div class="mt-2 flex flex-col gap-2">
        <VbenCheckButtonGroup
          v-model="radioValue"
          :options="options"
          v-bind="compProps"
        >
          <template #option="{ label, value, data }">
            <div class="flex items-center">
              <span>{{ label }}</span>
              <span class="ml-2 text-gray-400">{{ value }}</span>
              <span v-if="data.num" class="white ml-2">{{ data.num }}</span>
            </div>
          </template>
        </VbenCheckButtonGroup>
      </div>
      <p class="mt-4">Multiple selection:{{ checkValue }}</p>
      <div class="mt-2 flex flex-col gap-2">
        <VbenCheckButtonGroup
          v-model="checkValue"
          multiple
          :options="options"
          v-bind="compProps"
        />
      </div>
      <p class="mt-4">Custom Icon:{{ checkValue }}</p>
      <div class="mt-2 flex flex-col gap-2">
        <VbenCheckButtonGroup
          v-model="checkValue"
          multiple
          :options="options"
          v-bind="compProps"
        >
          <template #icon="{ loading, checked }">
            <LoaderCircle class="animate-spin" v-if="loading" />
            <SquareCheckBig v-else-if="checked" />
            <Square v-else />
          </template>
        </VbenCheckButtonGroup>
      </div>
    </Card>

    <Card title="Settings" class="mt-4">
      <Form />
    </Card>
  </Page>
</template>
