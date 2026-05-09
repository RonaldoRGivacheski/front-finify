<script lang="ts" setup>
import { ref } from 'vue';

import { EllipsisText, Page } from '@vben/common-ui';

import { Card } from 'ant-design-vue';

import DocButton from '../doc-button.vue';

const longText = `Vben Admin is a backend solution based on Vue 3.0, Vite, and TypeScript, aiming to provide a ready-to-use solution for developing medium to large-scale projects. It includes features such as secondary component encapsulation, utils, hooks, dynamic menus, permission verification, multi-theme configuration, and button-level permission control. The project uses the latest frontend technology stack and can serve as a starter template to help you quickly build enterprise-level backend product prototypes. It can also be used as an example to learn mainstream technologies such as Vue 3, Vite, and TypeScript. This project will continuously keep up with the latest technologies and apply them to the project. This project will continuously update with the latest technologies and apply them to its implementation. Vben Admin is a backend solution based on Vue 3.0, Vite, and TypeScript, aiming to provide a ready-to-use solution for developing medium to large-scale projects. It includes features such as secondary component encapsulation, utils, hooks, dynamic menus, permission verification, multi-theme configuration, and button-level permission control. The project will utilize the latest frontend technology stack and can serve as a starter template to help you quickly build enterprise-level backend product prototypes. It can also be used as an example to learn mainstream technologies such as Vue 3, Vite, and TypeScript. This project can also serve as an example for learning mainstream technologies such as Vue 3, Vite, and TypeScript. It will continuously update with the latest technologies and apply them to projects.`;
const text = ref(longText);
</script>

<template>
  <Page
    description="Used for omitting multi-line text, supports click to expand and custom content."
    title="Ellipsis Text Component Example"
  >
    <template #extra>
      <DocButton class="mb-2" path="/components/common-ui/vben-ellipsis-text" />
    </template>
    <Card class="mb-4" title="Basic Usage">
      <EllipsisText :max-width="500">{{ text }}</EllipsisText>
    </Card>

    <Card class="mb-4" title="Multi-line Omission">
      <EllipsisText :line="2">{{ text }}</EllipsisText>
    </Card>

    <Card class="mb-4" title="Click to Expand">
      <EllipsisText :line="3" expand>{{ text }}</EllipsisText>
    </Card>
    <Card class="mb-4" title="Custom Content">
      <EllipsisText :max-width="240">
        Lived in my heart, the lonely sea monster, the king of pain, started to
        get tired of the light of the deep sea and the stagnant waves.
        <template #tooltip>
          <div style="text-align: center">
            "Qin Huang Dao"<br />Lived in my heart, the lonely sea monster, the
            king of pain,<br />started to get tired of the light of the deep
            sea<br />and the stagnant waves.
          </div>
        </template>
      </EllipsisText>
    </Card>
  </Page>
</template>
