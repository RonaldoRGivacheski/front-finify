import { requestClient } from '#/api/request';

/**
 * Simulate arbitrary status code
 */
async function getMockStatusApi(status: string) {
  return requestClient.get('/status', { params: { status } });
}

export { getMockStatusApi };
