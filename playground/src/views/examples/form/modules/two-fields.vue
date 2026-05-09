<script lang="ts" setup>
import { Input, Select } from 'ant-design-vue';

const emit = defineEmits(['blur', 'change']);

const modelValue = defineModel<[string, string]>({
  default: () => [undefined, undefined],
});

function onChange() {
  emit('change', modelValue.value);
}
</script>
<template>
  <div class="flex w-full gap-1">
    <Select
      v-model:value="modelValue[0]"
      class="w-20"
      placeholder="Type"
      allow-clear
      :class="{ 'valid-success': !!modelValue[0] }"
      :options="[
        { label: 'Personal', value: 'personal' },
        { label: 'Work', value: 'work' },
        { label: 'Private', value: 'private' },
      ]"
      @blur="emit('blur')"
      @change="onChange"
    />
    <Input
      placeholder="Please enter your mobile number"
      class="flex-1"
      allow-clear
      :class="{ 'valid-success': modelValue[1]?.match(/^1[3-9]\d{9}$/) }"
      v-model:value="modelValue[1]"
      :maxlength="11"
      type="tel"
      @blur="emit('blur')"
      @change="onChange"
    />
  </div>
</template>
