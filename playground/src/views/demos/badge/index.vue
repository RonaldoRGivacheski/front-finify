<script lang="ts" setup>
import { reactive } from 'vue';
import { useRoute } from 'vue-router';

import { Page } from '@vben/common-ui';
import { useAccessStore } from '@vben/stores';

import { MenuBadge } from '@vben-core/menu-ui';

import { Button, Card, Radio, RadioGroup } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';

const colors = [
  { label: 'Default Preset', value: 'default' },
  { label: 'Destructive Preset', value: 'destructive' },
  { label: 'Primary Preset', value: 'primary' },
  { label: 'Success Preset', value: 'success' },
  { label: 'Custom', value: 'bg-gray-200 text-black' },
];

const route = useRoute();
const accessStore = useAccessStore();
const menu = accessStore.getMenuByPath(route.path);
const badgeProps = reactive({
  badge: menu?.badge as string,
  badgeType: menu?.badge ? 'normal' : (menu?.badgeType as 'dot' | 'normal'),
  badgeVariants: menu?.badgeVariants as string,
});

const [Form] = useVbenForm({
  handleValuesChange(values) {
    badgeProps.badge = values.badge;
    badgeProps.badgeType = values.badgeType;
    badgeProps.badgeVariants = values.badgeVariants;
  },
  schema: [
    {
      component: 'RadioGroup',
      componentProps: {
        buttonStyle: 'solid',
        options: [
          { label: 'Dot Badge', value: 'dot' },
          { label: 'Text Badge', value: 'normal' },
        ],
        optionType: 'button',
      },
      defaultValue: badgeProps.badgeType,
      fieldName: 'badgeType',
      label: 'Type',
    },
    {
      component: 'Input',
      componentProps: {
        maxLength: 4,
        placeholder: 'Enter badge content',
        style: { width: '200px' },
      },
      defaultValue: badgeProps.badge,
      fieldName: 'badge',
      label: 'Badge Content',
    },
    {
      component: 'RadioGroup',
      defaultValue: badgeProps.badgeVariants,
      fieldName: 'badgeVariants',
      label: 'Color',
    },
    {
      component: 'Input',
      fieldName: 'action',
    },
  ],
  showDefaultActions: false,
});

function updateMenuBadge() {
  if (menu) {
    menu.badge = badgeProps.badge;
    menu.badgeType = badgeProps.badgeType;
    menu.badgeVariants = badgeProps.badgeVariants;
  }
}
</script>

<template>
  <Page
    description="Menus can display badges, and these badges can be proactively updated"
    title="Menu Badge"
  >
    <Card title="Badge Update">
      <Form>
        <template #badgeVariants="slotProps">
          <RadioGroup v-bind="slotProps">
            <Radio
              v-for="color in colors"
              :key="color.value"
              :value="color.value"
            >
              <div
                :title="color.label"
                class="flex h-3.5 w-12.5 items-center justify-start"
              >
                <MenuBadge
                  v-bind="{ ...badgeProps, badgeVariants: color.value }"
                />
              </div>
            </Radio>
          </RadioGroup>
        </template>
        <template #action>
          <Button type="primary" @click="updateMenuBadge">更新徽标</Button>
        </template>
      </Form>
    </Card>
  </Page>
</template>
