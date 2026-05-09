import { baseRequestClient, requestClient } from '#/api/request';

export namespace AuthApi {
  /** Login interface parameters */
  export interface LoginParams {
    password?: string;
    username?: string;
  }

  /** Login interface response */
  export interface LoginResult {
    accessToken: string;
  }

  export interface RefreshTokenResult {
    data: string;
    status: number;
  }
}

/**
 * Login
 */
export async function loginApi(data: AuthApi.LoginParams) {
  return requestClient.post<AuthApi.LoginResult>('/auth/login', data, {
    withCredentials: true,
  });
}

/**
 * Refresh accessToken
 */
export async function refreshTokenApi() {
  return baseRequestClient.post<AuthApi.RefreshTokenResult>(
    '/auth/refresh',
    null,
    {
      withCredentials: true,
    },
  );
}

/**
 * Logout
 */
export async function logoutApi() {
  return baseRequestClient.post('/auth/logout', null, {
    withCredentials: true,
  });
}

/**
 * Get user permission codes
 */
export async function getAccessCodesApi() {
  return requestClient.get<string[]>('/auth/codes');
}
