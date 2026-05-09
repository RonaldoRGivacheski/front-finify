<script lang="ts" setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue';

import { Page } from '@vben/common-ui';

import { Button, Card, message, Space, Tag } from 'ant-design-vue';
import dayjs from 'dayjs';

import { useVbenForm } from '#/adapter/form';

import DocButton from '../doc-button.vue';

const transformedValues = ref<Record<string, any>>({});
const liveValues = ref<Record<string, any>>({});

const [Form, formApi] = useVbenForm({
  commonConfig: {
    componentProps: {
      class: 'w-full',
    },
  },
  handleSubmit,
  schema: [
    {
      component: 'RangePicker',
      fieldName: 'reportRange',
      help: 'Use setValue to split into startTime / endTime and remove the original field',
      label: 'Time range',
      valueFormat(value, setValue) {
        setValue('startTime', value?.[0]?.valueOf());
        setValue('endTime', value?.[1]?.valueOf());
      },
    },
    {
      component: 'DatePicker',
      fieldName: 'deadline',
      help: 'Return timestamp directly, keep original field name',
      label: 'Deadline',
      valueFormat(value) {
        return value?.valueOf();
      },
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter a keyword',
      },
      fieldName: 'keyword',
      label: 'Keyword',
    },
  ],
  wrapperClass: 'grid-cols-1 md:grid-cols-2',
});

const liveValuesPreview = computed(() => formatJsonPreview(liveValues.value));

const transformedValuesPreview = computed(() => {
  return formatJsonPreview(transformedValues.value);
});

function formatJsonPreview(value: Record<string, any>) {
  return JSON.stringify(
    value,
    (_key, currentValue) => {
      return dayjs.isDayjs(currentValue)
        ? currentValue.format('YYYY-MM-DD HH:mm:ss')
        : currentValue;
    },
    2,
  );
}

async function handleInspectValues() {
  await syncPreviewValues();
  message.success('getValues output has been refreshed');
}

function handleSetExampleValue() {
  formApi.setValues({
    deadline: dayjs('2026-04-12 18:30:00'),
    keyword: 'invoice',
    reportRange: [dayjs('2026-04-01 00:00:00'), dayjs('2026-04-12 23:59:59')],
  });
}

function handleSubmit(values: Record<string, any>) {
  transformedValues.value = values;
  message.success({
    content: `getValues output: ${JSON.stringify(values)}`,
  });
}

async function syncPreviewValues(values?: Record<string, any>) {
  liveValues.value = values ?? formApi.form?.values ?? {};
  transformedValues.value = await formApi.getValues();
}

onMounted(async () => {
  await nextTick();
  watch(
    () => formApi.form?.values,
    async (values) => {
      await syncPreviewValues(values);
    },
    {
      deep: true,
      immediate: true,
    },
  );
});
</script>

<template>
  <Page
    content-class="flex flex-col gap-4"
    description="Demo how schema.valueFormat converts component values to the payload required for submission/query."
    title="Form valueFormat"
  >
    <template #description>
      <div class="text-muted-foreground space-y-2">
        <p>
          <code>form.values</code> keeps the original value of the component,
          and <code>getValues()</code> / submit will output the converted
          payload according to <code>schema.valueFormat</code>.
        </p>
        <div class="flex flex-wrap gap-2">
          <Tag color="processing">
            return value: Write back the current field
          </Tag>
          <Tag color="success">setValue: Split and write to other fields</Tag>
          <Tag color="warning">
            return undefined: Keep the original field and delete it
          </Tag>
        </div>
      </div>
    </template>
    <template #extra>
      <DocButton path="/components/common-ui/vben-form" />
    </template>

    <Card title="valueFormat Example">
      <template #extra>
        <Space wrap>
          <Button @click="handleSetExampleValue">Set example data</Button>
          <Button type="primary" @click="handleInspectValues">
            View getValues output
          </Button>
        </Space>
      </template>
      <Form />
    </Card>

    <div class="grid gap-4 lg:grid-cols-2">
      <Card title="Raw form.values（component value）">
        <pre class="bg-muted overflow-auto rounded-md p-4 text-sm">{{
          liveValuesPreview
        }}</pre>
      </Card>
      <Card title="getValues / submit output（after valueFormat）">
        <pre class="bg-muted overflow-auto rounded-md p-4 text-sm">{{
          transformedValuesPreview
        }}</pre>
      </Card>
    </div>
  </Page>
</template>
