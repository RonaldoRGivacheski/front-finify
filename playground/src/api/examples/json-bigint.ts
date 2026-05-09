import { requestClient } from '#/api/request';

/**
 * Initiate request
 */
async function getBigIntData() {
  return requestClient.get('/demo/bigint');
}

export { getBigIntData };
