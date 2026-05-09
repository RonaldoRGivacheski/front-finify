<script lang="ts" setup>
import type { RefSelectProps } from 'ant-design-vue/es/select';

import { ref } from 'vue';

import { Page } from '@vben/common-ui';

import { Button, Card, message, Space } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';

const isReverseActionButtons = ref(false);

const [BaseForm, formApi] = useVbenForm({
  // Reverse the position of the action buttons
  actionButtonsReverse: isReverseActionButtons.value,
  // All form items share, can be individually overwritten in the form
  commonConfig: {
    // All form items
    componentProps: {
      class: 'w-full',
    },
  },
  // Use tailwindcss grid layout
  // Submit function
  handleSubmit: onSubmit,
  // Vertical layout, label and input in different rows, value is vertical
  layout: 'horizontal',
  // Horizontal layout, label and input in the same row
  schema: [
    {
      // Components need to be registered in #/adapter.ts and have types
      component: 'Input',
      // Component parameters
      componentProps: {
        placeholder: 'Please enter your username',
      },
      // Field name
      fieldName: 'field1',
      // Label displayed on the interface
      label: 'field1',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter',
      },
      fieldName: 'field2',
      label: 'field2',
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        filterOption: true,
        options: [
          {
            label: 'option1',
            value: '1',
          },
          {
            label: 'option2',
            value: '2',
          },
        ],
        placeholder: 'Please select',
        showSearch: true,
      },
      fieldName: 'fieldOptions',
      label: 'Select',
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

function handleClick(
  action:
    | 'batchAddSchema'
    | 'batchDeleteSchema'
    | 'componentRef'
    | 'disabled'
    | 'hiddenAction'
    | 'hiddenResetButton'
    | 'hiddenSubmitButton'
    | 'labelWidth'
    | 'resetDisabled'
    | 'resetLabelWidth'
    | 'reverseActionButtons'
    | 'showAction'
    | 'showResetButton'
    | 'showSubmitButton'
    | 'updateActionAlign'
    | 'updateResetButton'
    | 'updateSchema'
    | 'updateSubmitButton',
) {
  switch (action) {
    case 'batchAddSchema': {
      formApi.setState((prev) => {
        const currentSchema = prev?.schema ?? [];
        const newSchema = [];
        for (let i = 0; i < 3; i++) {
          newSchema.push({
            component: 'Input',
            componentProps: {
              placeholder: '请输入',
            },
            fieldName: `field${i}${Date.now()}`,
            label: `field+`,
          });
        }
        return {
          schema: [...currentSchema, ...newSchema],
        };
      });
      break;
    }

    case 'batchDeleteSchema': {
      formApi.setState((prev) => {
        const currentSchema = prev?.schema ?? [];
        return {
          schema: currentSchema.slice(0, -3),
        };
      });
      break;
    }
    case 'componentRef': {
      // Get the instance of the drop-down component and call its focus method
      formApi.getFieldComponentRef<RefSelectProps>('fieldOptions')?.focus?.();
      break;
    }
    case 'disabled': {
      formApi.setState({ commonConfig: { disabled: true } });
      break;
    }
    case 'hiddenAction': {
      formApi.setState({ showDefaultActions: false });
      break;
    }
    case 'hiddenResetButton': {
      formApi.setState({ resetButtonOptions: { show: false } });
      break;
    }
    case 'hiddenSubmitButton': {
      formApi.setState({ submitButtonOptions: { show: false } });
      break;
    }
    case 'labelWidth': {
      formApi.setState({
        commonConfig: {
          labelWidth: 150,
        },
      });
      break;
    }
    case 'resetDisabled': {
      formApi.setState({ commonConfig: { disabled: false } });
      break;
    }
    case 'resetLabelWidth': {
      formApi.setState({
        commonConfig: {
          labelWidth: 100,
        },
      });
      break;
    }
    case 'reverseActionButtons': {
      isReverseActionButtons.value = !isReverseActionButtons.value;
      formApi.setState({ actionButtonsReverse: isReverseActionButtons.value });
      break;
    }
    case 'showAction': {
      formApi.setState({ showDefaultActions: true });
      break;
    }
    case 'showResetButton': {
      formApi.setState({ resetButtonOptions: { show: true } });
      break;
    }
    case 'showSubmitButton': {
      formApi.setState({ submitButtonOptions: { show: true } });
      break;
    }

    case 'updateActionAlign': {
      formApi.setState({
        // You can adjust the class yourself
        actionWrapperClass: 'text-center',
      });
      break;
    }
    case 'updateResetButton': {
      formApi.setState({
        resetButtonOptions: { disabled: true },
      });
      break;
    }
    case 'updateSchema': {
      formApi.updateSchema([
        {
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
              {
                label: 'Option 3',
                value: '3',
              },
            ],
          },
          fieldName: 'fieldOptions',
        },
      ]);
      message.success(
        'Field `fieldOptions` dropdown options updated successfully.',
      );
      break;
    }
    case 'updateSubmitButton': {
      formApi.setState({
        submitButtonOptions: { loading: true },
      });
      break;
    }
  }
}
</script>

<template>
  <Page description="Form component api usage example." title="Form Component">
    <Space class="mb-5 flex-wrap">
      <Button @click="handleClick('updateSchema')">updateSchema</Button>
      <Button @click="handleClick('labelWidth')">Update labelWidth</Button>
      <Button @click="handleClick('resetLabelWidth')">
        Restore labelWidth
      </Button>
      <Button @click="handleClick('disabled')">Disable Form</Button>
      <Button @click="handleClick('resetDisabled')">Enable Form</Button>
      <Button @click="handleClick('reverseActionButtons')">
        Flip action button position
      </Button>
      <Button @click="handleClick('hiddenAction')">Hide action button</Button>
      <Button @click="handleClick('showAction')">Show action button</Button>
      <Button @click="handleClick('hiddenResetButton')">
        Hide reset button
      </Button>
      <Button @click="handleClick('showResetButton')">Show reset button</Button>
      <Button @click="handleClick('hiddenSubmitButton')">
        Hide submit button
      </Button>
      <Button @click="handleClick('showSubmitButton')">
        Show submit button
      </Button>
      <Button @click="handleClick('updateResetButton')">
        Update reset button
      </Button>
      <Button @click="handleClick('updateSubmitButton')">
        Update submit button
      </Button>
      <Button @click="handleClick('updateActionAlign')">
        Adjust action button position
      </Button>
      <Button @click="handleClick('batchAddSchema')"> Add Form Item </Button>
      <Button @click="handleClick('batchDeleteSchema')">
        Delete Form Item
      </Button>
      <Button @click="handleClick('componentRef')">Focus Dropdown</Button>
    </Space>
    <Card title="Operation Example">
      <BaseForm />
    </Card>
  </Page>
</template>
