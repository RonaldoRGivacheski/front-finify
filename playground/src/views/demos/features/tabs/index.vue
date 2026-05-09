<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { Page } from '@vben/common-ui';
import { useTabs } from '@vben/hooks';

import { Button, Card, Input } from 'ant-design-vue';

const router = useRouter();
const newTabTitle = ref('');

const {
  closeAllTabs,
  closeCurrentTab,
  closeLeftTabs,
  closeOtherTabs,
  closeRightTabs,
  closeTabByKey,
  refreshTab,
  resetTabTitle,
  setTabTitle,
} = useTabs();

function openTab() {
  // This is a route jump, you can also use path
  router.push({ name: 'VbenAbout' });
}

function openTabWithParams(id: number) {
  // This is a route jump, you can also use path
  router.push({ name: 'FeatureTabDetailDemo', params: { id } });
}

function reset() {
  newTabTitle.value = '';
  resetTabTitle();
}
</script>

<template>
  <Page
    description="For scenarios where tab manipulation is required."
    title="Tabs"
  >
    <Card class="mb-5" title="Open/Close Tabs">
      <div class="mb-3 text-foreground/80">
        If the tab exists, switch directly. If the tab does not exist, open a
        new tab.
      </div>
      <div class="flex flex-wrap gap-3">
        <Button type="primary" @click="openTab"> Open "About" Tab </Button>
        <Button type="primary" @click="closeTabByKey('/vben-admin/about')">
          Close "About" Tab
        </Button>
      </div>
    </Card>

    <Card class="mb-5" title="Tab Operation">
      <div class="mb-3 text-foreground/80">
        Used to dynamically control various operations of the tab
      </div>
      <div class="flex flex-wrap gap-3">
        <Button type="primary" @click="closeCurrentTab()">
          Close Current Tab
        </Button>
        <Button type="primary" @click="closeLeftTabs()">
          Close Left Tabs
        </Button>
        <Button type="primary" @click="closeRightTabs()">
          Close Right Tabs
        </Button>
        <Button type="primary" @click="closeAllTabs()"> Close All Tabs </Button>
        <Button type="primary" @click="closeOtherTabs()">
          Close Other Tabs
        </Button>
        <Button type="primary" @click="refreshTab()">
          Refresh Current Tab
        </Button>
      </div>
    </Card>

    <Card class="mb-5" title="Dynamic Title">
      <div class="mb-3 text-foreground/80">
        This operation will not affect the page title, only modify the Tab title
      </div>
      <div class="flex flex-wrap items-center gap-3">
        <Input
          v-model:value="newTabTitle"
          class="w-40"
          placeholder="Enter new title"
        />
        <Button type="primary" @click="() => setTabTitle(newTabTitle)">
          Modify
        </Button>
        <Button @click="reset"> Reset </Button>
      </div>
    </Card>

    <Card class="mb-5" title="Maximum Number of Open Tabs">
      <div class="mb-3 text-foreground/80">
        Limit the maximum number of tabs with parameters, controlled by
        `route.meta.maxNumOfOpenTab`
      </div>
      <div class="flex flex-wrap items-center gap-3">
        <template v-for="item in 5" :key="item">
          <Button type="primary" @click="openTabWithParams(item)">
            Open {{ item }} Detail Page
          </Button>
        </template>
      </div>
    </Card>
  </Page>
</template>
