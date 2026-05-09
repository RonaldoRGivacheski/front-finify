import { requestClient } from '#/api/request';

/**
 * Get system-supported timezone list
 */
export async function getTimezoneOptionsApi() {
  return await requestClient.get<
    {
      label: string;
      value: string;
    }[]
  >('/timezone/getTimezoneOptions');
}
/**
 * Get user timezone
 */
export async function getTimezoneApi(): Promise<null | string | undefined> {
  return requestClient.get<null | string | undefined>('/timezone/getTimezone');
}
/**
 * Set user timezone
 * @param timezone Timezone
 */
export async function setTimezoneApi(timezone: string): Promise<void> {
  return requestClient.post('/timezone/setTimezone', { timezone });
}
