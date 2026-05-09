<script lang="ts" setup>
import type { JsonViewerAction, JsonViewerValue } from '@vben/common-ui';

import { JsonViewer, Page } from '@vben/common-ui';

import { Card, message } from 'ant-design-vue';

import { json1, json2 } from './data';

function handleKeyClick(key: string) {
  message.info(`Clicked on key ${key}`);
}

function handleValueClick(value: JsonViewerValue) {
  message.info(`Clicked on value ${JSON.stringify(value)}`);
}

function handleCopied(_event: JsonViewerAction) {
  message.success('JSON has been copied');
}
</script>
<template>
  <Page
    title="Json Viewer"
    description="A component for rendering JSON structured data, supporting copying, expanding, etc., simple and easy to use"
  >
    <Card title="Default configuration">
      <JsonViewer :value="json1" />
    </Card>
    <Card
      title="Copyable, default expand 3 levels, show border, event handling"
      class="mt-4"
    >
      <JsonViewer
        :value="json2"
        :expand-depth="3"
        copyable
        :sort="false"
        @key-click="handleKeyClick"
        @value-click="handleValueClick"
        @copied="handleCopied"
        boxed
      />
    </Card>
    <Card title="Preview mode" class="mt-4">
      <JsonViewer
        :value="json2"
        copyable
        preview-mode
        :show-array-index="false"
      />
    </Card>
  </Page>
</template>
