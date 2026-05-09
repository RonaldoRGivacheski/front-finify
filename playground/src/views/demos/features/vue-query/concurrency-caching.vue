<script lang="ts" setup>
import type { Recordable } from '@vben/types';

import { useQuery } from '@tanstack/vue-query';

import { useVbenForm } from '#/adapter/form';
import { getMenuList } from '#/api';

const queryKey = ['demo', 'api', 'options'];
const count = 4;

const { dataUpdatedAt, promise: fetchDataFn } = useQuery({
  // Prefetch data during component rendering
  experimental_prefetchInRender: true,
  // The function to get interface data
  queryFn: getMenuList,
  queryKey,
  // Refetch data every time the component mounts. If you don't need to refetch every time, don't set it to always.
  refetchOnMount: 'always',
  // Cache time
  staleTime: 1000 * 60 * 5,
});

async function fetchOptions() {
  return await fetchDataFn.value;
}

const schema = [];

for (let i = 0; i < count; i++) {
  schema.push({
    component: 'ApiSelect',
    componentProps: {
      api: fetchOptions,
      class: 'w-full',
      filterOption: (input: string, option: Recordable<any>) => {
        return option.label.toLowerCase().includes(input.toLowerCase());
      },
      labelField: 'name',
      showSearch: true,
      valueField: 'id',
    },
    fieldName: `field${i}`,
    label: `Select ${i}`,
  });
}

const [Form] = useVbenForm({
  schema,
  showDefaultActions: false,
});
</script>
<template>
  <div>
    <div class="mb-2 flex gap-2">
      <div>The following {{ count }} components share one data source.</div>
      <div>
        Cache update time: {{ new Date(dataUpdatedAt).toLocaleString() }}
      </div>
    </div>
    <Form />
  </div>
</template>
