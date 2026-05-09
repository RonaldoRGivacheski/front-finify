<script lang="ts" setup>
import type { ImageUploadOptions } from '@vben/plugins/tiptap';

import { computed, ref } from 'vue';

import { Page } from '@vben/common-ui';
import { VbenTiptap, VbenTiptapPreview } from '@vben/plugins/tiptap';

import { Card, Switch } from 'ant-design-vue';
const content = ref(`
<h1>Vben Tiptap</h1>
<p>This editor is already packaged in <code>packages/effects/plugins/src/tiptap</code>.</p>
<p>You can directly import it into various apps using <code>@vben/plugins/tiptap</code>.</p>
<blockquote>StarterKit, Underline, TextAlign, and Placeholder are built in by default.</blockquote>
`);
const previewContent = computed(() => content.value);

const enableUpload = ref(true);

// Mock image upload: simulate upload delay and support progress callback
const imageUpload: ImageUploadOptions = {
  accept: 'image/*',
  maxSize: 5 * 1024 * 1024, // 5MB
  upload: (file, onProgress) =>
    new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
        }
        onProgress?.(Math.round(progress));
        if (progress >= 100) {
          // Return mock URL after upload is complete
          resolve(
            `https://picsum.photos/seed/${Date.now()}/640/${Math.round((640 * ((file.size % 3) + 2)) / 4)}`,
          );
        }
      }, 300);
    }),
  onUploadError: (error) => {
    console.error('Image upload failed:', error);
  },
};
</script>

<template>
  <Page title="Tiptap Rich Text">
    <template #description>
      <div class="mt-2 text-foreground/80">
        A unified, packaged rich text editor that can be reused directly in
        various apps.
      </div>
    </template>

    <Card class="mb-5" title="Editor">
      <div class="mb-3 flex items-center gap-3">
        <span class="text-sm">Enable image upload:</span>
        <Switch v-model:checked="enableUpload" />
      </div>
      <VbenTiptap
        v-model="content"
        :image-upload="enableUpload ? imageUpload : undefined"
      />
    </Card>

    <Card class="mb-5" title="Rich Text Preview">
      <VbenTiptapPreview :content="previewContent" />
    </Card>

    <Card title="HTML Output">
      <pre class="overflow-auto rounded-xl border border-border bg-muted p-4">
        {{ previewContent }}
      </pre>
    </Card>
  </Page>
</template>
