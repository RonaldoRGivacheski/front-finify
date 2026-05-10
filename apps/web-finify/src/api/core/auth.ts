import { baseRequestClient, requestClient } from '#/api/request';

export namespace AuthApi {
  //  Login interface parameters
  export interface LoginParams {
    password?: string;
    username?: string;
  }

  //  Login interface return value
  export interface LoginResult {
    access_token: string;
    refresh_token: string;
    expires_at: string;
  }

  export interface RefreshTokenParams {
    refresh_token: string;
  }

  export interface RefreshTokenResult {
    access_token: string;
    refresh_token: string;
    expires_at: string;
  }

  export interface Permissions {
    permissions: string[];
  }
}

//  Login
export async function loginApi(data: AuthApi.LoginParams) {
  return requestClient.post<AuthApi.LoginResult>('authentication/login/', data);
}

//  Refresh accessToken
export async function refreshTokenApi(data: AuthApi.RefreshTokenParams) {
  return requestClient.post<AuthApi.RefreshTokenResult>('authentication/refresh/', data);
}

//  Logout
export async function logoutApi() {
  return requestClient.post('authentication/logout/', {
    withCredentials: true,
  });
}

//  Get user permissions
export async function getAccessCodesApi() {
  return requestClient.get<AuthApi.Permissions>('authentication/permissions/', {
    withCredentials: true,
  });
}
