<script lang="ts" setup>
import { computed, reactive, ref } from 'vue';

import { Form, Input, message, Modal } from 'ant-design-vue';

import { createBankApi, updateBankApi } from '#/api/financial/bank';

const emits = defineEmits(['success']);
const open = ref(false);
const loading = ref(false);
const editId = ref<null | number>(null);

const formState = reactive({
  name: '',
  code: '',
});

const isEdit = computed(() => editId.value !== null);

const rules = {
  name: [{ required: true, message: 'Por favor, insira o nome do banco' }],
  code: [{ required: true, message: 'Por favor, insira o código do banco' }],
};

const formRef = ref();

function show(record?: any) {
  if (record) {
    editId.value = record.id;
    formState.name = record.name || '';
    formState.code = record.code || '';
  } else {
    editId.value = null;
    formState.name = '';
    formState.code = '';
  }
  open.value = true;
  if (formRef.value) {
    formRef.value.clearValidate();
  }
}

async function handleOk() {
  try {
    await formRef.value.validate();
    loading.value = true;

    if (isEdit.value && editId.value) {
      await updateBankApi(editId.value, formState);
      message.success('Banco atualizado com sucesso!');
    } else {
      await createBankApi(formState);
      message.success('Banco criado com sucesso!');
    }

    open.value = false;
    emits('success');
  } catch (error: any) {
    if (!error.errorFields) {
      console.error('Erro ao salvar banco:', error);
      message.error(
        'Erro ao salvar banco. Verifique os dados e tente novamente.',
      );
    }
  } finally {
    loading.value = false;
  }
}

defineExpose({ show });
</script>

<template>
  <Modal
    v-model:open="open"
    :title="isEdit ? 'Editar Banco' : 'Criar Novo Banco'"
    :confirm-loading="loading"
    @ok="handleOk"
    cancel-text="Cancelar"
    :ok-text="isEdit ? 'Salvar Alterações' : 'Criar Banco'"
  >
    <Form
      ref="formRef"
      :model="formState"
      :rules="rules"
      layout="vertical"
      class="mt-4"
    >
      <Form.Item label="Nome do Banco" name="name">
        <Input
          v-model:value="formState.name"
          placeholder="Ex: BANCO DO BRASIL S.A."
        />
      </Form.Item>
      <Form.Item label="Código do Banco" name="code">
        <Input v-model:value="formState.code" placeholder="Ex: 001" />
      </Form.Item>
    </Form>
  </Modal>
</template>
