<script lang="ts" setup>
import { Page } from '@vben/common-ui';

import { Button, Card, message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';

const [Form, formApi] = useVbenForm({
  // Submit function
  handleSubmit: onSubmit,
  schema: [
    {
      component: 'Input',
      defaultValue: 'hidden value',
      dependencies: {
        show: false,
        // Any field change will trigger
        triggerFields: ['field1Switch'],
      },
      fieldName: 'hiddenField',
      label: 'Hidden field',
    },
    {
      component: 'Switch',
      defaultValue: true,
      fieldName: 'field1Switch',
      help: 'Destroy by Dom control',
      label: 'Show field 1',
    },
    {
      component: 'Switch',
      defaultValue: true,
      fieldName: 'field2Switch',
      help: 'Hide by css control',
      label: 'Show field 2',
    },
    {
      component: 'Switch',
      fieldName: 'field3Switch',
      label: 'Disable field 3',
    },
    {
      component: 'Switch',
      fieldName: 'field4Switch',
      label: 'Field 4 required',
    },
    {
      component: 'Input',
      dependencies: {
        if(values) {
          return !!values.field1Switch;
        },
        // Only trigger when the specified field changes
        triggerFields: ['field1Switch'],
      },
      fieldName: 'field1',
      label: 'Field 1',
    },
    {
      component: 'Input',
      dependencies: {
        show(values) {
          return !!values.field2Switch;
        },
        triggerFields: ['field2Switch'],
      },
      fieldName: 'field2',
      label: 'Field 2',
    },
    {
      component: 'Input',
      dependencies: {
        disabled(values) {
          return !!values.field3Switch;
        },
        triggerFields: ['field3Switch'],
      },
      fieldName: 'field3',
      label: 'Field 3',
    },
    {
      component: 'Input',
      dependencies: {
        required(values) {
          return !!values.field4Switch;
        },
        triggerFields: ['field4Switch'],
      },
      fieldName: 'field4',
      label: 'Field 4',
    },
    {
      component: 'Input',
      dependencies: {
        rules(values) {
          if (values.field1 === '123') {
            return 'required';
          }
          return null;
        },
        triggerFields: ['field1'],
      },
      fieldName: 'field5',
      help: 'When the value of field1 is `123`, it is required',
      label: 'Dynamic rules',
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        class: 'w-full',
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
      dependencies: {
        componentProps(values) {
          if (values.field2 === '123') {
            return {
              options: [
                {
                  label: 'Option 1',
                  value: '1',
                },
                {
                  label: 'Option 2',
                  value: '2',
                },
                {
                  label: 'Option 3',
                  value: '3',
                },
              ],
            };
          }
          return {};
        },
        triggerFields: ['field2'],
      },
      fieldName: 'field6',
      help: 'When the value of field 2 is `123`, change the dropdown option.',
      label: 'Dynamic configuration',
    },
    {
      component: 'Input',
      fieldName: 'field7',
      label: 'Field 7',
    },
  ],
  // Large screen shows 3 per row, medium screen shows 2 per row, small screen shows 1 per row
  wrapperClass: 'grid-cols-1 md:grid-cols-3 lg:grid-cols-4',
});

const [SyncForm] = useVbenForm({
  handleSubmit: onSubmit,
  schema: [
    {
      component: 'Input',
      fieldName: 'field1',
      label: 'Field 1',
    },
    {
      component: 'Input',
      componentProps: {
        disabled: true,
      },
      dependencies: {
        trigger(values, form) {
          form.setFieldValue('field2', values.field1);
        },
        // Only trigger when the specified field changes
        triggerFields: ['field1'],
      },
      fieldName: 'field2',
      label: 'Field 2',
    },
  ],
  // Large screen shows 3 per row, medium screen shows 2 per row, small screen shows 1 per row
  wrapperClass: 'grid-cols-1 md:grid-cols-3 lg:grid-cols-4',
});

function onSubmit(values: Record<string, any>) {
  message.success({
    content: `form values: ${JSON.stringify(values)}`,
  });
}

function handleDelete() {
  formApi.setState((prev) => {
    return {
      schema: prev.schema?.filter((item) => item.fieldName !== 'field7'),
    };
  });
}

function handleAdd() {
  formApi.setState((prev) => {
    return {
      schema: [
        ...(prev?.schema ?? []),
        {
          component: 'Input',
          fieldName: `field${Date.now()}`,
          label: 'Field +',
        },
      ],
    };
  });
}

function handleUpdate() {
  formApi.setState((prev) => {
    return {
      schema: prev.schema?.map((item) => {
        if (item.fieldName === 'field3') {
          return {
            ...item,
            label: 'Field 3 - Modified',
          };
        }
        return item;
      }),
    };
  });
}
</script>

<template>
  <Page
    description="This example demonstrates dynamic interaction of form components, covering common scenarios. Adding, deleting, and modifying elements essentially involves changing the schema; you can also dynamically modify the schema using `setState`."
    title="Dynamic Form Components"
  >
    <Card title="Dynamic Form Components">
      <template #extra>
        <Button class="mr-2" @click="handleUpdate">Modify Field 3</Button>
        <Button class="mr-2" @click="handleDelete">Delete Field 7</Button>
        <Button @click="handleAdd">Add Field</Button>
      </template>
      <Form />
    </Card>

    <Card
      class="mt-5"
      title="Field synchronization: Data in field 1 is synchronized with data in field 2."
    >
      <SyncForm />
    </Card>
  </Page>
</template>
