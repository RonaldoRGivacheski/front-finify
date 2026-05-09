<script lang="ts" setup>
import type { RadioGroupProps } from 'ant-design-vue';

import type { FormLayout } from '@vben/common-ui';

import type { CollapsibleParamSchema } from '@vben-core/shadcn-ui';

import { h, ref } from 'vue';

import { Page } from '@vben/common-ui';

import { VbenCollapsibleParams } from '@vben-core/shadcn-ui';

import { Button, Card, message, RadioGroup } from 'ant-design-vue';

import { useVbenForm, z } from '#/adapter/form';

import DocButton from '../doc-button.vue';

const layouts: RadioGroupProps['options'] = [
  { label: 'Vertical', value: 'vertical' },
  { label: 'Horizontal', value: 'horizontal' },
];

const layout = ref<FormLayout>('vertical');

function getNumberValidator(key: string, limit?: [number?, number?]) {
  let validator = z.number({
    required_error: `${key} value cannot be empty`,
    invalid_type_error: `${key} value must be a number`,
  });

  if (limit) {
    if (limit[0] !== undefined) {
      validator = validator.min(limit[0], {
        message: `${key} value cannot be less than ${limit[0]}`,
      });
    }
    if (limit[1] !== undefined) {
      validator = validator.max(limit[1], {
        message: `${key} value cannot be greater than ${limit[1]}`,
      });
    }
  }

  return validator.optional();
}

const paramsSchema: CollapsibleParamSchema[] = [
  {
    key: 'micro_batch_size',
    description: `Batch size, representing the data step length for model parameter updates during model training. It can be understood as how many data samples the model processes before updating the model parameters.
    The generally recommended batch size is 16/32, meaning the model updates its parameters every 16 or 32 data samples`,
    option: {
      min: 8,
      max: 1024,
      step: 8,
    },
  },
  {
    key: 'learning_rate',
    description:
      'Learning rate, representing the incremental parameter weight for each update. The larger the learning rate value, the greater the parameter change, and the greater the impact on the model',
    option: {
      step: 1e-4,
      type: 'exponential',
      min: 0,
      max: 1,
    },
  },
  {
    key: 'eval_steps',
    description:
      'Validation step: The interval step for model validation during the training phase, used to periodically evaluate the model training accuracy and training loss',
    option: {
      min: 1,
      max: 2_147_483_647,
    },
  },
  {
    key: 'num_train_epochs',
    description:
      'Number of training epochs: represents the number of times the model learns the dataset during model training. It can be understood as the number of times the data is viewed. The generally recommended range is 1-3 times, which can be adjusted according to requirements',
    option: {
      min: 1,
      max: 200,
    },
  },
  {
    key: 'max_length',
    description: `Sequence length: The maximum length of a single training data sample. Sequences longer than the configured length will be discarded.`,
    option: {
      min: 500,
      max: 131_072,
    },
  },
  {
    key: 'warmup_ratio',
    description:
      'Learning rate warm-up ratio: the ratio of the learning rate warm-up phase to the total training steps',
    option: {
      min: 0,
      max: 1,
      precision: 2,
      step: 0.01,
    },
  },
  {
    key: 'save_steps',
    description: 'Checkpoint saving interval',
    option: {
      min: 1,
      max: 2_147_483_647,
    },
  },
];

const paramsValidator = z
  .object({
    micro_batch_size: getNumberValidator('micro_batch_size', [8, 1024]),
    learning_rate: getNumberValidator('learning_rate'),
    eval_steps: getNumberValidator('eval_steps', [1, 2_147_483_647]),
    num_train_epochs: getNumberValidator('num_train_epochs', [1, 200]),
    max_length: getNumberValidator('max_length', [500, 131_072]),
    warmup_ratio: getNumberValidator('warmup_ratio', [0, 1]),
    save_steps: getNumberValidator('save_steps', [1, 2_147_483_647]),
  })
  .required();

const [BaseForm, baseFormApi] = useVbenForm({
  showDefaultActions: false,
  // Common to all form items, can be overridden separately in the form
  commonConfig: {
    colon: true,
    componentProps: {
      class: 'w-full',
    },
  },
  handleSubmit: onSubmit,
  layout: 'vertical',
  schema: [
    {
      component: 'Switch',
      fieldName: 'qat',
      componentProps: {
        checkedChildren: '开',
        unCheckedChildren: '关',
        class: 'w-auto',
      },
      label: 'QAT',
      formItemClass: 'col-span-2',
      defaultValue: false,
    },
    {
      // component:'CollapsibleParams',
      component: h(VbenCollapsibleParams),
      componentProps: {
        params: paramsSchema,
        // maxHeight: 200, //Limit maximum height, scrollable after expansion
        // defaultOpen: true, // Default to false to collapse
        // visibleCount: 0 // Default 3, minimum visible is 1, less than 1 takes 1
      },
      modelPropName: 'value',
      fieldName: 'params',
      label: '参数配置',
      formItemClass: 'col-span-8 items-baseline col-start-1',
      dependencies: {
        triggerFields: ['qat'],
        componentProps(values) {
          return {
            params: values.qat
              ? [
                  {
                    key: 'calib_steps',
                    description: `Calibration step: The size of the calibration dataset is equal to the calibration step multiplied by the training batch size`,
                    option: {
                      min: 1,
                    },
                  },
                  ...paramsSchema,
                ]
              : paramsSchema,
          };
        },
        trigger(values, __, controller) {
          // Access the instance of VbenCollapsibleParams in the form
          const paramsRef =
            controller.getFieldComponentRef<typeof VbenCollapsibleParams>(
              'params',
            );
          if (values.qat) {
            paramsRef?.updateValues?.({
              calib_steps: 10,
              micro_batch_size: 32,
              learning_rate: 4e-5,
              eval_steps: 80,
              num_train_epochs: 3,
              max_length: 32_768,
              warmup_ratio: 0.1,
              save_steps: 80,
            });
          } else {
            paramsRef?.updateValues?.({
              calib_steps: null,
            });
          }
        },
        rules(values) {
          if (values.qat) {
            return paramsValidator.extend({
              calib_steps: getNumberValidator('calib_steps', [1]),
            });
          }
          return paramsValidator;
        },
      },
      rules: paramsValidator,
      defaultValue: {
        micro_batch_size: 8,
        learning_rate: 1e-5,
        eval_steps: 50,
        num_train_epochs: 3,
        max_length: 32_768,
        warmup_ratio: 0.05,
        save_steps: 50,
      },
    },
    {
      component: 'RichEditor',
      fieldName: 'richEditor',
      label: 'Rich Text',
      formItemClass: 'col-span-12 items-baseline',
      collapsible: true,
      defaultCollapsed: false, // Default false
    },
  ],
  wrapperClass: 'grid-cols-12',
});

function onSubmit(values: Record<string, any>) {
  message.info({
    content: `form values: ${JSON.stringify(values)}`,
  });
}

function onLayoutChange() {
  baseFormApi.setState({
    layout: layout.value,
  });
}

function handleSetFormValue() {
  baseFormApi.setFieldValue('params', {
    micro_batch_size: 1024,
    learning_rate: 1e-5,
    eval_steps: 150,
    num_train_epochs: 13,
    max_length: 131_072,
    warmup_ratio: 0.05,
    save_steps: 150,
  });
}

function handleResetFormValue() {
  baseFormApi.resetForm(undefined, { force: true });
}

async function handleSubmitFormValue() {
  const { valid } = await baseFormApi.validate();

  if (valid) {
    baseFormApi.submitForm();
  }
}
</script>

<template>
  <Page
    auto-content-height
    content-class="flex flex-col gap-4"
    title="Collapsible Form Item"
  >
    <template #description>
      <div class="text-muted-foreground">
        <p>
          Collapsible form item, as well as collapsible parameter configuration
          component example
        </p>
      </div>
    </template>
    <template #extra>
      <DocButton class="mb-2" path="/components/common-ui/vben-form" />
    </template>
    <Card title="Basic Example">
      <template #extra>
        <div class="inline-flex items-center gap-4!">
          <RadioGroup
            :options="layouts"
            option-type="button"
            v-model:value="layout"
            @change="onLayoutChange"
          />
          <Button type="primary" @click="handleSetFormValue">
            Set form values
          </Button>
          <Button type="primary" @click="handleSubmitFormValue">
            Submit form
          </Button>
          <Button type="primary" @click="handleResetFormValue">
            Reset form
          </Button>
        </div>
      </template>
      <div class="w-full overflow-hidden">
        <BaseForm />
      </div>
    </Card>
  </Page>
</template>
