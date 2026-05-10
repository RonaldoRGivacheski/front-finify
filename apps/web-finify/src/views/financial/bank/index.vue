<script lang="ts" setup>
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';

import { ref } from 'vue';

import { AccessControl } from '@vben/access';
import { Page } from '@vben/common-ui';
import { IconifyIcon } from '@vben/icons';

import { Button } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getBanksApi } from '#/api/financial/bank';

import BankModal from './BankModal.vue';

const formOptions: VbenFormProps = {
  // Configuração do formulário de busca/filtro
  schema: [
    {
      component: 'Input',
      fieldName: 'name',
      label: 'Nome',
      componentProps: {
        placeholder: 'Filtrar por nome',
        allowClear: true,
      },
    },
    {
      component: 'Input',
      fieldName: 'code',
      label: 'Código',
      componentProps: {
        placeholder: 'Filtrar por código',
        allowClear: true,
      },
    },
  ],
  wrapperClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
};

const gridOptions: VxeGridProps<any> = {
  columns: [
    { field: 'code', title: 'Código', width: 120 },
    { field: 'name', title: 'Nome', minWidth: 200 },
    {
      field: 'created_at',
      title: 'Criado Em',
      width: 180,
      formatter: ({ cellValue }) => {
        if (!cellValue) return '';
        return new Date(cellValue).toLocaleString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        });
      },
    },
    {
      field: 'updated_at',
      title: 'Atualizado Em',
      width: 180,
      formatter: ({ cellValue }) => {
        if (!cellValue) return '';
        return new Date(cellValue).toLocaleString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        });
      },
    },
    {
      title: 'Ações',
      field: 'action',
      width: 100,
      fixed: 'right',
      slots: { default: 'action' },
    },
  ],
  pagerConfig: {
    enabled: true,
  },
  toolbarConfig: {
    custom: true,
    refresh: true,
    zoom: true,
  },
};

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
});

gridApi.setGridOptions({
  proxyConfig: {
    ajax: {
      query: async ({ page }) => {
        const { currentPage, pageSize } = page;
        const offset = (currentPage - 1) * pageSize;
        const limit = pageSize;

        // Pega os valores do formulário diretamente da API do formulário!
        const formValues = (await gridApi.formApi.getValues()) || {};
        const filters = { ...formValues };

        Object.keys(filters).forEach((key) => {
          if (
            filters[key] === '' ||
            filters[key] === null ||
            filters[key] === undefined
          ) {
            delete filters[key];
          }
        });

        const params = {
          limit,
          offset,
          ...filters,
        };
        return await getBanksApi(params);
      },
    },
  },
});

const bankModalRef = ref();

function handleSuccess() {
  gridApi.reload();
}
</script>

<template>
  <Page auto-content-height>
    <AccessControl type="code" :codes="['financial-bank_view']">
      <Grid>
        <template #toolbar-actions>
          <AccessControl type="code" :codes="['financial-bank_add']">
            <Button type="primary" @click="bankModalRef?.show()">
              Criar Novo Banco
            </Button>
          </AccessControl>
        </template>
        <template #action="{ row }">
          <AccessControl type="code" :codes="['financial-bank_change']">
            <Button type="link" size="small" @click="bankModalRef?.show(row)">
              <IconifyIcon icon="lucide:pencil" class="text-lg" />
            </Button>
          </AccessControl>
        </template>
      </Grid>
    </AccessControl>

    <BankModal ref="bankModalRef" @success="handleSuccess" />
  </Page>
</template>
