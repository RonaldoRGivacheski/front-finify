<script lang="ts" setup>
import { useVbenDrawer } from '@vben/common-ui';

import { useVbenForm } from '#/adapter/form';

defineOptions({
  name: 'FormDrawerDemo',
});

const [Form, formApi] = useVbenForm({
  schema: [
    {
      component: 'Input',
      componentProps: {
        placeholder: 'Please input',
      },
      fieldName: 'field1',
      label: 'Field1',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: 'Please input',
      },
      fieldName: 'field2',
      label: 'Field2',
      rules: 'required',
    },
  ],
  showDefaultActions: false,
});
const [Drawer, drawerApi] = useVbenDrawer({
  onCancel() {
    drawerApi.close();
  },
  onConfirm: async () => {
    await formApi.submitForm();
    drawerApi.close();
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const { values } = drawerApi.getData<Record<string, any>>();
      if (values) {
        formApi.setValues(values);
      }
    }
  },
  title: 'Embedded Form Example',
});
</script>
<template>
  <Drawer>
    <Form />
  </Drawer>
</template>
