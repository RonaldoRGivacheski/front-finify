import { requestClient } from '#/api/request';

export namespace BankApi {
  export interface BankItem {
    id: number;
    name: string;
    code: string;
    created_at: string;
    updated_at: string;
  }

  export interface CreateBankParams {
    name: string;
    code: string;
  }

  export interface UpdateBankParams {
    name: string;
    code: string;
  }

  export interface BankListResult {
    limit: number;
    offset: number;
    count: number;
    next: string;
    previous: string;
    results: BankItem[];
  }

  export interface BankListParams {
    limit?: number;
    offset?: number;
    name?: string;
    code?: string;
  }
}

export async function getBanksApi(params: BankApi.BankListParams) {
  const data = await requestClient.get<BankApi.BankListResult>(
    '/financial/banks/',
    { params },
  );

  return {
    items: data.results || [],
    total: data.count || 0,
  };
}

export async function createBankApi(data: BankApi.CreateBankParams) {
  return requestClient.post('/financial/banks/', data);
}

export async function updateBankApi(
  id: number,
  data: BankApi.UpdateBankParams,
) {
  return requestClient.patch(`/financial/banks/${id}/`, data);
}
