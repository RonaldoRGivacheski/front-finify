<script lang="ts" setup>
import type { UploadFile } from 'ant-design-vue';

import { h, ref, toRaw } from 'vue';

import { Page } from '@vben/common-ui';

import { useDebounceFn } from '@vueuse/core';
import { Button, Card, message, Spin, Tag } from 'ant-design-vue';
import dayjs from 'dayjs';

import { useVbenForm, z } from '#/adapter/form';
import { getAllMenusApi } from '#/api';
import { upload_file } from '#/api/examples/upload';
import { $t } from '#/locales';

import DocButton from '../doc-button.vue';

const keyword = ref('');
const fetching = ref(false);
// Simulate remote data fetching
function fetchRemoteOptions({ keyword = 'Option' }: Record<string, any>) {
  fetching.value = true;
  return new Promise((resolve) => {
    setTimeout(() => {
      const options = Array.from({ length: 10 }).map((_, index) => ({
        label: `${keyword}-${index}`,
        value: `${keyword}-${index}`,
      }));
      resolve(options);
      fetching.value = false;
    }, 1000);
  });
}

const [BaseForm, baseFormApi] = useVbenForm({
  // All form items share, can be individually overridden in the form
  commonConfig: {
    // Display a colon after the label
    colon: true,
    // All form items
    componentProps: {
      class: 'w-full',
    },
  },
  fieldMappingTime: [['rangePicker', ['startTime', 'endTime'], 'YYYY-MM-DD']],
  // Submit function
  handleSubmit: onSubmit,
  handleValuesChange(_values, fieldsChanged) {
    message.info(`Form fields changed: ${fieldsChanged.join('，')}`);
  },

  // Vertical layout, label and input are in different rows, value is vertical
  // Horizontal layout, label and input are in the same row
  layout: 'horizontal',
  schema: [
    {
      // Component needs to be registered in #/adapter.ts and have a type
      component: 'Input',
      // Component parameters
      componentProps: {
        placeholder: 'Please enter your username',
      },
      // Field name
      fieldName: 'username',
      // Display label on the interface
      label: 'String',
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'desc',
      // Display description on the interface
      description: 'This is a form description',
      label: 'String (with description)',
    },
    {
      // Component needs to be registered in #/adapter.ts and have a type
      component: 'ApiSelect',
      // Component parameters
      componentProps: {
        // Convert menu interface to options format
        afterFetch: (data: { name: string; path: string }[]) => {
          return data.map((item: any) => ({
            label: item.name,
            value: item.path,
          }));
        },
        // Menu interface
        api: getAllMenusApi,
        autoSelect: 'first',
      },
      // Field name
      fieldName: 'api',
      // Display label on the interface
      label: 'ApiSelect',
    },
    {
      component: 'ApiSelect',
      // Component parameters
      componentProps: () => {
        return {
          api: fetchRemoteOptions,
          // Disable local filtering
          filterOption: false,
          // If data is being fetched, use the slot to display a loading
          notFoundContent: fetching.value ? undefined : null,
          // Record when the search term changes, use useDebounceFn for debouncing
          onSearch: useDebounceFn((value: string) => {
            keyword.value = value;
          }, 300),
          // Remote search parameters. params will update when the search term changes
          params: {
            keyword: keyword.value || undefined,
          },
          // Remote search judgment. Only when true, it is allowed to call the api
          shouldFetch: (params: any) => {
            return !!params?.keyword;
          },
          showSearch: true,
        };
      },
      // Field name
      fieldName: 'remoteSearch',
      // Display label on the interface
      label: 'Remote Search',
      help: 'Remote search, only when there is input, query is performed',
      renderComponentContent: () => {
        return {
          notFoundContent: fetching.value ? h(Spin) : undefined,
        };
      },
      rules: 'selectRequired',
    },
    {
      component: 'ApiTreeSelect',
      // Component parameters
      componentProps: {
        // Menu interface
        api: getAllMenusApi,
        // Convert menu interface to options format
        labelField: 'name',
        valueField: 'path',
        childrenField: 'children',
      },
      // Field name
      fieldName: 'apiTree',
      // Display label on the interface
      label: 'ApiTreeSelect',
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
      component: 'IconPicker',
      fieldName: 'icon',
      label: 'Icon',
    },
    {
      colon: false,
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
      label: () => h(Tag, { color: 'warning' }, () => '😎Custom:'),
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
      label: 'RadioGroup',
    },
    {
      component: 'Radio',
      fieldName: 'radio',
      label: '',
      renderComponentContent: () => {
        return {
          default: () => ['Radio'],
        };
      },
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
      label: 'CheckboxGroup',
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
      rules: z
        .boolean()
        .refine((v) => v, { message: "Why don't you agree? Check it!" }),
    },
    {
      component: 'Mentions',
      componentProps: {
        options: [
          {
            label: 'afc163',
            value: 'afc163',
          },
          {
            label: 'zombieJ',
            value: 'zombieJ',
          },
        ],
        placeholder: 'Please enter',
      },
      fieldName: 'mentions',
      label: 'Mention',
    },
    {
      component: 'Rate',
      fieldName: 'rate',
      label: 'Rating',
    },
    {
      component: 'Switch',
      componentProps: {
        class: 'w-auto',
      },
      fieldName: 'switch',
      help: () =>
        ['This is a multi-line help message', 'Second line', 'Third line'].map(
          (v) => h('p', v),
        ),
      label: 'Switch',
    },
    {
      component: 'DatePicker',
      fieldName: 'datePicker',
      help: (values) =>
        [
          `This is help information that can output other field values. Rate: ${values?.rate}`,
        ].map((v) => h('p', v)),
      label: 'Date',
    },
    {
      component: 'RangePicker',
      fieldName: 'rangePicker',
      label: 'Range',
    },
    {
      component: 'TimePicker',
      fieldName: 'timePicker',
      label: 'Time',
    },
    {
      component: 'TreeSelect',
      componentProps: {
        allowClear: true,
        placeholder: 'Please select',
        showSearch: true,
        treeData: [
          {
            label: 'root 1',
            value: 'root 1',
            children: [
              {
                label: 'parent 1',
                value: 'parent 1',
                children: [
                  {
                    label: 'parent 1-0',
                    value: 'parent 1-0',
                    children: [
                      {
                        label: 'my leaf',
                        value: 'leaf1',
                      },
                      {
                        label: 'your leaf',
                        value: 'leaf2',
                      },
                    ],
                  },
                  {
                    label: 'parent 1-1',
                    value: 'parent 1-1',
                  },
                ],
              },
              {
                label: 'parent 2',
                value: 'parent 2',
              },
            ],
          },
        ],
        treeNodeFilterProp: 'label',
      },
      fieldName: 'treeSelect',
      label: 'TreeSelect',
    },
    {
      component: 'Upload',
      componentProps: {
        // More attributes can be seen at: https://ant.design/components/upload-cn
        accept: '.png,.jpg,.jpeg',
        // Automatically carry authentication information
        customRequest: upload_file,
        disabled: false,
        maxCount: 3,
        // Unit: MB
        maxSize: 2,
        multiple: false,
        showUploadList: true,
        // Built-in styles for the upload list, supporting four basic styles: text, picture, picture-card and picture-circle
        listType: 'picture-card',
        draggable: true, // Enable drag and drop sorting
        // onChange event has been rewritten, please extend on this basis if you need custom implementation
        handleChange: ({ file }: { file: UploadFile }) => {
          const { name, status } = file;
          if (status === 'done') {
            message.success(`${name} ${$t('examples.form.upload-success')}`);
          } else if (status === 'error') {
            message.error(`${name} ${$t('examples.form.upload-fail')}`);
          }
        },
        onDragSort: (oldIndex: number, newIndex: number) => {
          console.warn(`Image moved from ${oldIndex} to ${newIndex}`);
        },
      },
      fieldName: 'files',
      label: $t('examples.form.file'),
      renderComponentContent: () => {
        return {
          default: () => $t('examples.form.upload-image'),
        };
      },
      rules: 'selectRequired',
    },
    {
      component: 'Upload',
      componentProps: {
        accept: '.png,.jpg,.jpeg',
        customRequest: upload_file,
        maxCount: 1,
        maxSize: 2,
        listType: 'picture-card',
        // Whether to enable image cropping (multiple selections or non-images will not trigger the cropping box)
        crop: true,
        // Cropping ratio
        aspectRatio: '1:1',
      },
      fieldName: 'cropImage',
      label: $t('examples.form.crop-image'),
      renderComponentContent: () => {
        return {
          default: () => $t('examples.form.upload-image'),
        };
      },
      rules: 'selectRequired',
    },
    {
      component: 'RichEditor',
      fieldName: 'richEditor',
      label: 'RichText',
      formItemClass: 'col-span-3 items-baseline',
    },
  ],
  // Large screen displays 3 items per row, medium screen displays 2 items per row, small screen displays 1 item per row
  wrapperClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
});

function onSubmit(values: Record<string, any>) {
  const files = toRaw(values.files) as UploadFile[];
  const cropImage = (toRaw(values.cropImage) ?? []) as UploadFile[];
  const doneFiles = files.filter((file) => file.status === 'done');
  const failedFiles = files.filter((file) => file.status !== 'done');
  const doneCrop = cropImage.filter((file) => file.status === 'done');
  const failedCrop = cropImage.filter((file) => file.status !== 'done');

  const msg = [
    ...doneFiles.map((file) => file.response?.url || file.url),
    ...failedFiles.map((file) => file.name),
  ].join(', ');
  const msgCrop = [
    ...doneCrop.map((file) => file.response?.url || file.url),
    ...failedCrop.map((file) => file.name),
  ].join(', ');

  if (failedFiles.length === 0) {
    message.success({
      content: `${$t('examples.form.upload-urls')}: ${msg}`,
    });
  } else {
    message.error({
      content: `${$t('examples.form.upload-error')}: ${msg}`,
    });
    return;
  }
  if (doneCrop.length > 0 && failedCrop.length === 0) {
    message.success({
      content: `${$t('examples.form.upload-urls')}: ${msgCrop}`,
    });
  } else if (failedCrop.length > 0) {
    message.error({
      content: `${$t('examples.form.upload-error')}: ${msgCrop}`,
    });
    return;
  }
  // If urls are needed, replace them with the required urls before submission
  values.files = doneFiles.map((file) => file.response?.url || file.url);
  values.cropImage = doneCrop.map((file) => file.response?.url || file.url);
  message.success({
    content: `form values: ${JSON.stringify(values)}`,
  });
}

function handleSetFormValue() {
  /**
   * Set form values (multiple)
   */
  baseFormApi.setValues({
    checkboxGroup: ['1'],
    datePicker: dayjs('2022-01-01'),
    files: [
      {
        name: 'example.png',
        status: 'done',
        uid: '-1',
        url: 'https://unpkg.com/@vbenjs/static-source@0.1.7/source/logo-v1.webp',
      },
    ],
    mentions: '@afc163',
    number: 3,
    options: '1',
    password: '2',
    radioGroup: '1',
    rangePicker: [dayjs('2022-01-01'), dayjs('2022-01-02')],
    rate: 3,
    switch: true,
    timePicker: dayjs('2022-01-01 12:00:00'),
    treeSelect: 'leaf1',
    username: '1',
    richEditor: `
      <h1>Vben Tiptap</h1>
      <p>This editor has been encapsulated in <code>packages/effects/plugins/src/tiptap</code>.</p>
      <p>You can directly import it in each app through <code>@vben/plugins/tiptap</code>.</p>
      <blockquote>Default built-in StarterKit、Underline、TextAlign、Placeholder.</blockquote>
    `,
  });

  // Set a single form value
  baseFormApi.setFieldValue('checkbox', true);
}
</script>

<template>
  <Page
    content-class="flex flex-col gap-4"
    description="Form components basic example，Please note that the parameter code used in this page will be added with some simple comments for easy understanding，Please read it carefully。"
    title="Form"
  >
    <template #description>
      <div class="text-muted-foreground">
        <p>
          This is a basic example of a form component. Please note that the
          parameter code used on this page will have some simple comments added
          for easier understanding. Please review them carefully.
        </p>
      </div>
    </template>
    <template #extra>
      <DocButton class="mb-2" path="/components/common-ui/vben-form" />
    </template>
    <Card title="Basic Example">
      <template #extra>
        <Button type="primary" @click="handleSetFormValue">
          Set Form Values
        </Button>
      </template>
      <BaseForm />
    </Card>
  </Page>
</template>
