<script lang="ts" setup>
import { h } from 'vue';

import { Page } from '@vben/common-ui';

import { Card } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';

import DocButton from '../doc-button.vue';

const [CustomLayoutForm] = useVbenForm({
  // This feature is shared by all form fields and can be overridden individually within a form.
  commonConfig: {
    // All form items
    componentProps: {
      class: 'w-full',
    },
  },
  layout: 'horizontal',
  schema: [
    {
      component: 'Select',
      fieldName: 'field1',
      label: 'String',
    },
    {
      component: 'TreeSelect',
      fieldName: 'field2',
      label: 'String',
    },
    {
      component: 'Mentions',
      fieldName: 'field3',
      label: 'String',
    },
    {
      component: 'Input',
      fieldName: 'field4',
      label: 'String',
    },
    {
      component: 'InputNumber',
      fieldName: 'field5',
      // Starts from the third column, equivalent to leaving a column in the middle
      formItemClass: 'col-start-3',
      label: 'Leave a column empty',
    },
    {
      component: 'Divider',
      fieldName: '_divider',
      formItemClass: 'col-span-3',
      hideLabel: true,
      renderComponentContent: () => {
        return {
          default: () => h('div', '分割线'),
        };
      },
    },
    {
      component: 'Textarea',
      fieldName: 'field6',
      // Occupies three columns of space and aligns baselines
      formItemClass: 'col-span-3 items-baseline',
      label: 'Occupies three columns',
    },
    {
      component: 'Input',
      fieldName: 'field7',
      // Occupies two columns of space, starting from the second column, equivalent to leaving a column empty in front
      formItemClass: 'col-span-2 col-start-2',
      label: 'Occupies two columns',
    },
    {
      component: 'Input',
      fieldName: 'field8',
      // Leave space on the left and right
      formItemClass: 'col-start-2',
      label: 'Leave space on the left and right',
    },
    {
      component: 'InputPassword',
      fieldName: 'field9',
      formItemClass: 'col-start-1',
      label: 'String',
    },
  ],
  // Total of three columns
  wrapperClass: 'grid-cols-3',
});
</script>

<template>
  <Page
    content-class="flex flex-col gap-4"
    description="Custom form item layout"
    title="Form custom layout"
  >
    <template #description>
      <div class="text-muted-foreground">
        <p>
          Custom form item layout using Tailwind, using Divider to split the
          form.
        </p>
      </div>
    </template>
    <template #extra>
      <DocButton class="mb-2" path="/components/common-ui/vben-form" />
    </template>
    <Card title="Custom form layout">
      <CustomLayoutForm />
    </Card>
  </Page>
</template>
