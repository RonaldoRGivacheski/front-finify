<script lang="ts" setup>
import { Page } from '@vben/common-ui';

import { Button, Card, message } from 'ant-design-vue';

import { useVbenForm, z } from '#/adapter/form';

const [Form, formApi] = useVbenForm({
  // Common for all form items, can be individually overridden in the form
  commonConfig: {
    // All form items
    componentProps: {
      class: 'w-full',
    },
  },
  // Submit function
  handleSubmit: onSubmit,
  // Vertical layout, label and input in different rows, value is vertical
  // Horizontal layout, label and input in the same row
  layout: 'horizontal',
  schema: [
    {
      // The component needs to be registered in #/adapter.ts, and its type needs to be specified.
      component: 'Input',
      // Parameters of the corresponding component
      componentProps: {
        placeholder: 'Please enter',
      },
      // Field name
      fieldName: 'field1',
      // Label displayed on the interface
      label: 'Field 1',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter',
      },
      defaultValue: 'default value',
      fieldName: 'field2',
      label: 'default value (required)',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter',
      },
      fieldName: 'field3',
      label: 'default value (optional)',
      rules: z.string().default('default value').optional(),
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter',
      },
      fieldName: 'field31',
      label: 'custom message',
      rules: z.string().min(1, { message: 'At least 1 character is required' }),
    },
    {
      component: 'Input',
      // Parameters of the corresponding component
      componentProps: {
        placeholder: 'Please enter',
      },
      // Field name
      fieldName: 'field4',
      // Label displayed on the interface
      label: 'Email',
      rules: z.string().email('Please enter a valid email address'),
    },
    {
      component: 'InputNumber',
      componentProps: {
        placeholder: 'Please enter',
      },
      fieldName: 'number',
      label: 'Number',
      rules: 'required',
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        filterOption: true,
        options: [
          {
            label: 'Option 1',
            value: '1',
          },
          {
            label: 'Option 2',
            value: '2',
          },
        ],
        placeholder: 'Please select',
        showSearch: true,
      },
      defaultValue: undefined,
      fieldName: 'options',
      label: 'Select',
      rules: 'selectRequired',
    },
    {
      component: 'RadioGroup',
      componentProps: {
        options: [
          {
            label: 'Option 1',
            value: '1',
          },
          {
            label: 'Option 2',
            value: '2',
          },
        ],
      },
      fieldName: 'radioGroup',
      label: 'Single Select',
      rules: 'selectRequired',
    },
    {
      component: 'CheckboxGroup',
      componentProps: {
        name: 'cname',
        options: [
          {
            label: 'Option 1',
            value: '1',
          },
          {
            label: 'Option 2',
            value: '2',
          },
        ],
      },
      fieldName: 'checkboxGroup',
      label: 'Multiple Select',
      rules: 'selectRequired',
    },
    {
      component: 'Checkbox',
      fieldName: 'checkbox',
      label: '',
      renderComponentContent: () => {
        return {
          default: () => ['I have read and agree'],
        };
      },
      rules: z.boolean().refine((value) => value, {
        message: 'Please check',
      }),
    },
    {
      component: 'DatePicker',
      defaultValue: undefined,
      fieldName: 'datePicker',
      label: 'Date Select',
      rules: 'selectRequired',
    },
    {
      component: 'RangePicker',
      defaultValue: undefined,
      fieldName: 'rangePicker',
      label: 'Range Select',
      rules: 'selectRequired',
    },
    {
      component: 'InputPassword',
      componentProps: {
        placeholder: 'Please enter',
      },
      fieldName: 'password',
      label: 'Password',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter',
      },
      fieldName: 'input-blur',
      formFieldProps: {
        validateOnChange: false,
        validateOnModelUpdate: false,
      },
      help: 'Only trigger validation on blur',
      label: 'Blur Trigger',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter',
      },
      fieldName: 'input-async',
      label: 'Async Validate',
      rules: z
        .string()
        .min(3, 'Username must be at least 3 characters long')
        .refine(
          async (username) => {
            // Assuming this is an asynchronous function that simulates checking if a username already exists
            const checkUsernameExists = async (
              username: string,
            ): Promise<boolean> => {
              await new Promise((resolve) => setTimeout(resolve, 1000));
              return username === 'existingUser';
            };
            const exists = await checkUsernameExists(username);
            return !exists;
          },
          {
            message: 'Username already exists',
          },
        ),
    },
  ],
  // Large screen displays 3 items per row, medium screen displays 2 items per row, small screen displays 1 item per row
  wrapperClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
});

function onSubmit(values: Record<string, any>) {
  message.success({
    content: `form values: ${JSON.stringify(values)}`,
  });
}
</script>

<template>
  <Page description="Form Validation Example" title="Form Component">
    <Card title="Basic Component Validation Example">
      <template #extra>
        <Button @click="() => formApi.validate()">Validate Form</Button>
        <Button class="mx-2" @click="() => formApi.resetValidate()">
          Clear Validation Information
        </Button>
      </template>
      <Form />
    </Card>
  </Page>
</template>
