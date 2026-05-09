<script lang="ts" setup>
import { ref } from 'vue';

import { Page } from '@vben/common-ui';

import { Button, Card, message, Step, Steps, Switch } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';

const currentTab = ref(0);
function onFirstSubmit(values: Record<string, any>) {
  message.success({
    content: `form1 values: ${JSON.stringify(values)}`,
  });
  currentTab.value = 1;
}
function onSecondReset() {
  currentTab.value = 0;
}
function onSecondSubmit(values: Record<string, any>) {
  message.success({
    content: `form2 values: ${JSON.stringify(values)}`,
  });
}

const [FirstForm, firstFormApi] = useVbenForm({
  commonConfig: {
    componentProps: {
      class: 'w-full',
    },
  },
  handleSubmit: onFirstSubmit,
  layout: 'horizontal',
  resetButtonOptions: {
    show: false,
  },
  schema: [
    {
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter',
      },
      fieldName: 'formFirst',
      label: 'Form 1 Field',
      rules: 'required',
    },
  ],
  submitButtonOptions: {
    content: 'Next',
  },
  wrapperClass: 'grid-cols-1 md:grid-cols-1 lg:grid-cols-1',
});
const [SecondForm, secondFormApi] = useVbenForm({
  commonConfig: {
    componentProps: {
      class: 'w-full',
    },
  },
  handleReset: onSecondReset,
  handleSubmit: onSecondSubmit,
  layout: 'horizontal',
  resetButtonOptions: {
    content: 'Previous Step',
  },
  schema: [
    {
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter',
      },
      fieldName: 'formSecond',
      label: 'Form 2 Field',
      rules: 'required',
    },
  ],
  wrapperClass: 'grid-cols-1 md:grid-cols-1 lg:grid-cols-1',
});
const needMerge = ref(true);
async function handleMergeSubmit() {
  const values = await firstFormApi
    .merge(secondFormApi)
    .submitAllForm(needMerge.value);
  message.success({
    content: `merged form values: ${JSON.stringify(values)}`,
  });
}
</script>

<template>
  <Page
    description="Example of merging form components: In some scenarios, such as multi-step forms, you may need to merge multiple forms and submit them together. By default, the merge uses Object.assign rules. If you need to process the data specially, you can pass false."
    title="Form Components"
  >
    <Card title="Basic Example">
      <template #extra>
        <Switch
          v-model:checked="needMerge"
          checked-children="Enable Field Merge"
          class="mr-4"
          un-checked-children="Disable Field Merge"
        />
        <Button type="primary" @click="handleMergeSubmit">Merge Submit</Button>
      </template>
      <div class="mx-auto max-w-lg">
        <Steps :current="currentTab" class="steps">
          <Step title="Form 1" />
          <Step title="Form 2" />
        </Steps>
        <div class="p-20">
          <FirstForm v-show="currentTab === 0" />
          <SecondForm v-show="currentTab === 1" />
        </div>
      </div>
    </Card>
  </Page>
</template>
