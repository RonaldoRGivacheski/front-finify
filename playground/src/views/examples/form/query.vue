<script lang="ts" setup>
import { Page } from '@vben/common-ui';

import { Card, message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';

const [QueryForm] = useVbenForm({
  // Expand by default
  collapsed: false,
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
      // Component must be registered in #/adapter.ts and have a type
      component: 'Input',
      // Corresponding component parameters
      componentProps: {
        placeholder: 'Please enter your username',
      },
      // Field name
      fieldName: 'username',
      // Label displayed on the interface
      label: 'String',
    },
    {
      component: 'InputPassword',
      componentProps: {
        placeholder: 'Please enter your password',
      },
      fieldName: 'password',
      label: 'Password',
    },
    {
      component: 'InputNumber',
      componentProps: {
        placeholder: 'Please enter',
      },
      fieldName: 'number',
      label: 'Number (with suffix)',
      suffix: () => '¥',
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
      fieldName: 'options',
      label: 'Dropdown',
    },
    {
      component: 'DatePicker',
      fieldName: 'datePicker',
      label: 'Date Picker',
    },
  ],
  // Whether it can be expanded
  showCollapseButton: true,
  submitButtonOptions: {
    content: 'Search',
  },
  // Display 3 items per row on large screens, 2 items per row on medium screens, and 1 item per row on small screens
  wrapperClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
});

const [InlineForm] = useVbenForm({
  layout: 'inline',
  schema: [
    {
      // The component needs to be registered in #/adapter.ts, and its type needs to be specified.
      component: 'Input',
      // Parameters of the corresponding component
      componentProps: {
        placeholder: 'Please enter your username',
      },
      // Field name
      fieldName: 'username',
      // Label displayed on the interface
      label: 'String',
    },
    {
      component: 'InputPassword',
      componentProps: {
        placeholder: 'Please enter your password',
      },
      fieldName: 'password',
      label: 'Password',
    },
    {
      component: 'InputNumber',
      componentProps: {
        placeholder: 'Please enter',
      },
      fieldName: 'number',
      label: 'Number (with suffix)',
      suffix: () => '¥',
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
      fieldName: 'options',
      label: 'Dropdown',
    },
  ],
});

const [QueryForm1] = useVbenForm({
  // Expanded by default
  collapsed: true,
  collapsedRows: 2,
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
  schema: (() => {
    const schema = [];
    for (let index = 0; index < 14; index++) {
      schema.push({
        // The component needs to be registered in #/adapter.ts, and its type needs to be specified.
        component: 'Input',
        // Field name
        fieldName: `field${index}`,
        // Label displayed on the interface
        label: `字段${index}`,
      });
    }
    return schema;
  })(),
  // Whether it can be expanded
  showCollapseButton: true,
  submitButtonOptions: {
    content: 'Search',
  },
  // Display 3 items per row on large screens, 2 on medium screens, and 1 on small screens
  wrapperClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
});

const [QueryForm2] = useVbenForm({
  // Action group newLine: displayed on a new line. rowEnd: displayed in the row, right-aligned (default). inline: uses grid default style
  actionLayout: 'newLine',
  actionPosition: 'left', // Action group displayed on the left
  // Expanded by default
  collapsed: true,
  collapsedRows: 3,
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
  layout: 'vertical',
  schema: [
    {
      // The component needs to be registered in #/adapter.ts, and its type needs to be specified.
      component: 'Input',
      // Parameters of the corresponding component
      componentProps: {
        placeholder: 'Please enter your username',
      },
      // Field name
      fieldName: 'username',
      // Label displayed on the interface
      label: 'String',
    },
    {
      component: 'InputPassword',
      componentProps: {
        placeholder: 'Please enter your password',
      },
      fieldName: 'password',
      label: 'Password',
    },
    {
      component: 'InputNumber',
      componentProps: {
        placeholder: 'Please enter',
      },
      fieldName: 'number',
      label: 'Number (with suffix)',
      suffix: () => '¥',
    },
    {
      component: 'DatePicker',
      fieldName: 'datePicker',
      label: 'Date Picker',
    },
  ],
  // Whether it can be expanded
  showCollapseButton: true,
  submitButtonOptions: {
    content: 'Search',
  },
  // Display 3 items per row on large screens, 2 items per row on medium screens, and 1 item per row on small screens
  wrapperClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
});

function onSubmit(values: Record<string, any>) {
  message.success({
    content: `form values: ${JSON.stringify(values)}`,
  });
}
</script>

<template>
  <Page
    description="Form components are often used in combination with tables and can be expanded or collapsed."
    title="form components"
  >
    <Card class="mb-5" title="query form, default expanded">
      <QueryForm />
    </Card>

    <Card class="mb-5" title="inline form">
      <InlineForm />
    </Card>

    <Card class="mb-5" title="query form, default expanded, vertical layout">
      <QueryForm2 />
    </Card>

    <Card
      title="query form, default collapsed, preserves 2 rows when collapsed"
    >
      <QueryForm1 />
    </Card>
  </Page>
</template>
