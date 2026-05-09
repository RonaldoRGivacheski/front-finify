import type { Recordable } from '@vben/types';

import { requestClient } from '#/api/request';

export namespace SystemMenuApi {
  /** Badge color set */
  export const BadgeVariants = [
    'default',
    'destructive',
    'primary',
    'success',
    'warning',
  ] as const;
  /** Badge type set */
  export const BadgeTypes = ['dot', 'normal'] as const;
  /** Menu type set */
  export const MenuTypes = [
    'catalog',
    'menu',
    'embedded',
    'link',
    'button',
  ] as const;
  /** System menu */
  export interface SystemMenu {
    [key: string]: any;
    /** Backend permission identifier */
    authCode: string;
    /** Children */
    children?: SystemMenu[];
    /** Component */
    component?: string;
    /** Menu ID */
    id: string;
    /** Menu metadata */
    meta?: {
      /** Icon displayed when active */
      activeIcon?: string;
      /** Path of the menu that needs to be activated when used as a route */
      activePath?: string;
      /** Fixed in the tab bar */
      affixTab?: boolean;
      /** Order of fixed in the tab bar */
      affixTabOrder?: number;
      /** Badge content (valid when badge type is normal) */
      badge?: string;
      /** Badge type */
      badgeType?: (typeof BadgeTypes)[number];
      /** Badge colors */
      badgeVariants?: (typeof BadgeVariants)[number];
      /** Hide children in menu */
      hideChildrenInMenu?: boolean;
      /** Hide in breadcrumb */
      hideInBreadcrumb?: boolean;
      /** Hide in menu */
      hideInMenu?: boolean;
      /** Hide in tab bar */
      hideInTab?: boolean;
      /** Menu icon */
      icon?: string;
      /** Embedded Iframe URL */
      iframeSrc?: string;
      /** Cache page */
      keepAlive?: boolean;
      /** External link URL */
      link?: string;
      /** Maximum number of open tabs for the same route */
      maxNumOfOpenTab?: number;
      /** No need for basic layout */
      noBasicLayout?: boolean;
      /** Open in new window */
      openInNewWindow?: boolean;
      /** Menu sorting */
      order?: number;
      /** Additional route parameters */
      query?: Recordable<any>;
      /** Menu title */
      title?: string;
    };
    /** Menu name */
    name: string;
    /** Route path */
    path: string;
    /** Parent ID */
    pid: string;
    /** Redirect */
    redirect?: string;
    /** Menu type */
    type: (typeof MenuTypes)[number];
  }
}

/**
 * Get menu data list
 */
async function getMenuList() {
  return requestClient.get<Array<SystemMenuApi.SystemMenu>>(
    '/system/menu/list',
  );
}

async function isMenuNameExists(
  name: string,
  id?: SystemMenuApi.SystemMenu['id'],
) {
  return requestClient.get<boolean>('/system/menu/name-exists', {
    params: { id, name },
  });
}

async function isMenuPathExists(
  path: string,
  id?: SystemMenuApi.SystemMenu['id'],
) {
  return requestClient.get<boolean>('/system/menu/path-exists', {
    params: { id, path },
  });
}

/**
 * Create menu
 * @param data Menu data
 */
async function createMenu(
  data: Omit<SystemMenuApi.SystemMenu, 'children' | 'id'>,
) {
  return requestClient.post('/system/menu', data);
}

/**
 * Update menu
 *
 * @param id Menu ID
 * @param data Menu data
 */
async function updateMenu(
  id: string,
  data: Omit<SystemMenuApi.SystemMenu, 'children' | 'id'>,
) {
  return requestClient.put(`/system/menu/${id}`, data);
}

/**
 * Delete menu
 * @param id Menu ID
 */
async function deleteMenu(id: string) {
  return requestClient.delete(`/system/menu/${id}`);
}

export {
  createMenu,
  deleteMenu,
  getMenuList,
  isMenuNameExists,
  isMenuPathExists,
  updateMenu,
};
