<script lang="ts" setup>
import { h, markRaw } from 'vue';

import { Page } from '@vben/common-ui';

import { Card, Input, message } from 'ant-design-vue';

import { useVbenForm, z } from '#/adapter/form';

import TwoFields from './modules/two-fields.vue';

const [Form] = useVbenForm({
  // This feature is shared by all form fields and can be overridden individually within a form.
  commonConfig: {
    // All form items
    componentProps: {
      class: 'w-full',
    },
    labelClass: 'w-2/6',
  },
  fieldMappingTime: [['field4', ['phoneType', 'phoneNumber'], null]],
  // Submission function
  handleSubmit: onSubmit,
  // Vertical layout, label and input in different rows, value is vertical
  // Horizontal layout, label and input in the same row
  layout: 'horizontal',
  schema: [
    {
      // The component needs to be registered in #/adapter.ts and a type added
      component: 'Input',
      fieldName: 'field',
      label: 'Custom suffix',
      suffix: () => h('span', { class: 'text-red-600' }, '元'),
    },
    {
      component: 'Input',
      fieldName: 'field1',
      label: 'Custom component slot',
      renderComponentContent: () => ({
        prefix: () => 'prefix',
        suffix: () => 'suffix',
      }),
    },
    {
      component: h(Input, { placeholder: '请输入Field2' }),
      fieldName: 'field2',
      label: 'Custom component',
      modelPropName: 'value',
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'field3',
      label: 'Custom component (slot)',
      rules: 'required',
    },
    {
      component: markRaw(TwoFields),
      defaultValue: [undefined, ''],
      disabledOnChangeListener: false,
      fieldName: 'field4',
      formItemClass: 'col-span-1',
      label: 'Combined field',
      rules: z
        .array(z.string().optional())
        .length(2, 'Please select a type and enter a phone number')
        .refine((v) => !!v[0], {
          message: 'Please select a type',
        })
        .refine((v) => !!v[1] && v[1] !== '', {
          message: '　　　　　　　Please enter a phone number',
        })
        .refine((v) => v[1]?.match(/^1[3-9]\d{9}$/), {
          message: '　　　　　　　Incorrect phone number format',
        }),
    },
  ],
  // Two fields per line on medium screens, one field per line on small screens
  wrapperClass: 'grid-cols-1 md:grid-cols-2',
});

function onSubmit(values: Record<string, any>) {
  message.success({
    content: `form values: ${JSON.stringify(values)}`,
  });
}
</script>

<template>
  <Page description="Custom form component example" title="Form component">
    <Card title="Basic example">
      <Form>
        <template #field3="slotProps">
          <Input placeholder="Please enter" v-bind="slotProps" />
        </template>
      </Form>
    </Card>
  </Page>
</template>
