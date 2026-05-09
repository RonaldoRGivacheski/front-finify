<script lang="ts" setup>
import type { TippyProps } from '@vben/common-ui';

import { reactive } from 'vue';

import { Page, Tippy } from '@vben/common-ui';

import { Button, Card, Flex } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';

const tippyProps = reactive<TippyProps>({
  animation: 'shift-away',
  arrow: true,
  content: 'This is a prompt',
  delay: [200, 200],
  duration: 200,
  followCursor: false,
  hideOnClick: false,
  inertia: true,
  maxWidth: 'none',
  placement: 'top',
  theme: 'dark',
  trigger: 'mouseenter focusin',
});

function parseBoolean(value: string) {
  switch (value) {
    case 'false': {
      return false;
    }
    case 'true': {
      return true;
    }
    default: {
      return value;
    }
  }
}

const [Form] = useVbenForm({
  handleValuesChange(values) {
    Object.assign(tippyProps, {
      ...values,
      delay: [values.delay1, values.delay2],
      followCursor: parseBoolean(values.followCursor),
      hideOnClick: parseBoolean(values.hideOnClick),
      trigger: values.trigger.join(' '),
    });
  },
  schema: [
    {
      component: 'RadioGroup',
      componentProps: {
        buttonStyle: 'solid',
        class: 'w-full',
        options: [
          { label: 'Auto', value: 'auto' },
          { label: 'Dark', value: 'dark' },
          { label: 'Light', value: 'light' },
        ],
        optionType: 'button',
      },
      defaultValue: tippyProps.theme,
      fieldName: 'theme',
      label: 'Theme',
    },
    {
      component: 'Select',
      componentProps: {
        class: 'w-full',
        options: [
          { label: 'Shift Away', value: 'shift-away' },
          { label: 'Shift Toward', value: 'shift-toward' },
          { label: 'Scale', value: 'scale' },
          { label: 'Perspective', value: 'perspective' },
          { label: 'Fade', value: 'fade' },
        ],
      },
      defaultValue: tippyProps.animation,
      fieldName: 'animation',
      label: 'Animation Type',
    },
    {
      component: 'RadioGroup',
      componentProps: {
        buttonStyle: 'solid',
        options: [
          { label: 'Yes', value: true },
          { label: 'No', value: false },
        ],
        optionType: 'button',
      },
      defaultValue: tippyProps.inertia,
      fieldName: 'inertia',
      label: 'Animation Inertia',
    },
    {
      component: 'Select',
      componentProps: {
        class: 'w-full',
        options: [
          { label: 'Top', value: 'top' },
          { label: 'Top Start', value: 'top-start' },
          { label: 'Top End', value: 'top-end' },
          { label: 'Bottom', value: 'bottom' },
          { label: 'Bottom Start', value: 'bottom-start' },
          { label: 'Bottom End', value: 'bottom-end' },
          { label: 'Left', value: 'left' },
          { label: 'Left Start', value: 'left-start' },
          { label: 'Left End', value: 'left-end' },
          { label: 'Right', value: 'right' },
          { label: 'Right Start', value: 'right-start' },
          { label: 'Right End', value: 'right-end' },
        ],
      },
      defaultValue: tippyProps.placement,
      fieldName: 'placement',
      label: 'Position',
    },
    {
      component: 'InputNumber',
      componentProps: {
        addonAfter: 'milliseconds',
      },
      defaultValue: tippyProps.duration,
      fieldName: 'duration',
      label: 'Animation Duration',
    },
    {
      component: 'InputNumber',
      componentProps: {
        addonAfter: 'milliseconds',
      },
      defaultValue: 100,
      fieldName: 'delay1',
      label: 'Show Delay',
    },
    {
      component: 'InputNumber',
      componentProps: {
        addonAfter: 'milliseconds',
      },
      defaultValue: 100,
      fieldName: 'delay2',
      label: 'Hide Delay',
    },
    {
      component: 'Input',
      defaultValue: tippyProps.content,
      fieldName: 'content',
      label: 'Content',
    },
    {
      component: 'RadioGroup',
      componentProps: {
        buttonStyle: 'solid',
        options: [
          { label: 'Yes', value: true },
          { label: 'No', value: false },
        ],
        optionType: 'button',
      },
      defaultValue: tippyProps.arrow,
      fieldName: 'arrow',
      label: 'Arrow',
    },
    {
      component: 'Select',
      componentProps: {
        class: 'w-full',
        options: [
          { label: 'Not Follow', value: 'false' },
          { label: 'Fully Follow', value: 'true' },
          { label: 'Horizontal Only', value: 'horizontal' },
          { label: 'Vertical Only', value: 'vertical' },
          { label: 'Initial Only', value: 'initial' },
        ],
      },
      defaultValue: tippyProps.followCursor?.toString(),
      fieldName: 'followCursor',
      label: 'Follow Cursor',
    },
    {
      component: 'Select',
      componentProps: {
        class: 'w-full',
        mode: 'multiple',
        options: [
          { label: 'Mouse Enter', value: 'mouseenter' },
          { label: 'Click', value: 'click' },
          { label: 'Focus', value: 'focusin' },
          { label: 'No Trigger, Manual', value: 'manual' },
        ],
      },
      defaultValue: tippyProps.trigger?.split(' '),
      fieldName: 'trigger',
      label: 'Trigger Mode',
    },
    {
      component: 'Select',
      componentProps: {
        class: 'w-full',
        options: [
          { label: 'No', value: 'false' },
          { label: 'Yes', value: 'true' },
          { label: 'Only Internal', value: 'toggle' },
        ],
      },
      defaultValue: tippyProps.hideOnClick?.toString(),
      dependencies: {
        componentProps(_, formAction) {
          return {
            disabled: !formAction.values.trigger.includes('click'),
          };
        },
        triggerFields: ['trigger'],
      },
      fieldName: 'hideOnClick',
      help: 'Only valid when the trigger mode is `click`',
      label: 'Hide on Click',
    },
    {
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: 'none、200px',
      },
      defaultValue: tippyProps.maxWidth,
      fieldName: 'maxWidth',
      label: 'Maximum Width',
    },
  ],
  showDefaultActions: false,
  wrapperClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
});

function goDoc() {
  window.open('https://atomiks.github.io/tippyjs/v6/all-props/');
}
</script>
<template>
  <Page title="Tippy">
    <template #description>
      <div class="flex items-center">
        <p>
          Tippy is a lightweight tooltip library that can be used to create
          various interactive tooltips, such as tooltips, guide tips, etc
        </p>
        <Button type="link" size="small" @click="goDoc">
          View Documentation
        </Button>
      </div>
    </template>
    <Card title="Instruction Form Usage">
      <p class="mb-4">
        Instruction form usage is relatively concise. You can pass configuration
        directly to the component that needs to display tooltip using v-tippy,
        which is suitable for tooltips with fixed content
      </p>
      <Flex warp="warp" gap="20" align="center">
        <Button v-tippy="'This is a tooltip using default configuration'">
          Default Configuration
        </Button>

        <Button
          v-tippy="{
            theme: 'light',
            content: 'This is a tooltip with always light theme',
          }"
        >
          Specify Theme
        </Button>
        <Button
          v-tippy="{
            theme: 'light',
            content:
              'This tooltip will be activated 100 milliseconds after the component is triggered',
            delay: 100,
          }"
        >
          Specify Delay
        </Button>
        <Button
          v-tippy="{
            content: 'This tooltip uses the `scale` animation',
            animation: 'scale',
          }"
        >
          Specify Animation
        </Button>
      </Flex>
    </Card>
    <Card title="Component Form Usage" class="mt-4">
      <div class="flex w-full justify-center">
        <Tippy v-bind="tippyProps">
          <Button>Hover over this component to experience the effect</Button>
        </Tippy>
      </div>

      <Form class="mt-4" />
      <template #actions>
        <p
          class="cursor-default text-secondary-foreground hover:text-secondary-foreground"
        >
          For more configuration options, please refer to the
          <Button type="link" size="small" @click="goDoc">Documentation</Button>
          ，Only some common configurations are listed here
        </p>
      </template>
    </Card>
  </Page>
</template>
