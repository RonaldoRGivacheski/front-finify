<script lang="ts" setup>
import { ref } from 'vue';

import { Page } from '@vben/common-ui';

import { Button, Card, Switch } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';

defineOptions({
  name: 'ScrollToErrorTest',
});

const scrollEnabled = ref(true);

const [Form, formApi] = useVbenForm({
  scrollToFirstError: scrollEnabled.value,
  schema: [
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入用户名',
      },
      fieldName: 'username',
      label: 'username',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter your email address.',
      },
      fieldName: 'email',
      label: 'Email',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter your phone number.',
      },
      fieldName: 'phone',
      label: 'Phone',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter your address.',
      },
      fieldName: 'address',
      label: 'address',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter your remark.',
      },
      fieldName: 'remark',
      label: 'remark',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter your company name.',
      },
      fieldName: 'company',
      label: 'Company',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter your position.',
      },
      fieldName: 'position',
      label: 'position',
      rules: 'required',
    },
    {
      component: 'Select',
      componentProps: {
        options: [
          { label: 'male', value: 'male' },
          { label: 'female', value: 'female' },
        ],
        placeholder: 'Please select your gender.',
      },
      fieldName: 'gender',
      label: 'gender',
      rules: 'selectRequired',
    },
  ],
  showDefaultActions: false,
});

// Test validateAndSubmitForm (validate and submit)
async function testValidateAndSubmit() {
  await formApi.validateAndSubmitForm();
}

// Test validate (manually validate the entire form)
async function testValidate() {
  await formApi.validate();
}

// Test validateField (validate a single field)
async function testValidateField() {
  await formApi.validateField('username');
}

// Toggle scroll function
function toggleScrollToError() {
  formApi.setState({ scrollToFirstError: scrollEnabled.value });
}

// Fill partial data test
async function fillPartialData() {
  await formApi.resetForm();
  await formApi.setFieldValue('username', 'test');
  await formApi.setFieldValue('email', 'test@example.com');
}
</script>

<template>
  <Page
    description="Test form validation failure automatically scrolls to the error field function"
    title="Scroll to Error Test"
  >
    <Card title="Feature Test">
      <template #extra>
        <div class="flex items-center gap-2">
          <Switch
            v-model:checked="scrollEnabled"
            @change="toggleScrollToError"
          />
          <span>Enable scroll to error</span>
        </div>
      </template>

      <div class="space-y-4">
        <div class="rounded-sm bg-blue-50 p-4">
          <h3 class="mb-2 font-medium">Test description:</h3>
          <ul class="list-inside list-disc space-y-1 text-sm">
            <li>
              All validation methods will automatically scroll to the first
              error field when validation fails
            </li>
            <li>
              The switch in the upper right corner can be used to control
              whether the automatic scroll function is enabled
            </li>
          </ul>
        </div>

        <div class="rounded-sm border p-4">
          <h4 class="mb-3 font-medium">Verification method test:</h4>
          <div class="flex flex-wrap gap-2">
            <Button type="primary" @click="testValidateAndSubmit">
              Test validateAndSubmitForm()
            </Button>
            <Button @click="testValidate"> Test validate() </Button>
            <Button @click="testValidateField"> Test validateField() </Button>
          </div>
          <div class="mt-2 text-xs text-gray-500">
            <p>• validateAndSubmitForm(): Validate and submit the form</p>
            <p>• validate(): Manually validate the entire form</p>
            <p>
              • validateField(): Validate a single field (test username field
              here)
            </p>
          </div>
        </div>

        <div class="rounded-sm border p-4">
          <h4 class="mb-3 font-medium">Data filling test:</h4>
          <div class="flex flex-wrap gap-2">
            <Button @click="fillPartialData"> Fill partial data </Button>
            <Button @click="() => formApi.resetForm()"> Reset form </Button>
          </div>
          <div class="mt-2 text-xs text-gray-500">
            <p>
              • After filling in partial data, validation will scroll to the
              first error field
            </p>
          </div>
        </div>

        <Form />
      </div>
    </Card>
  </Page>
</template>
