import type { UserInfo } from '@vben/types';

import { requestClient } from '#/api/request';

/**
 * Get user info
 */
export async function getUserInfoApi() {
  return requestClient.get<UserInfo>('/user/info');
}
