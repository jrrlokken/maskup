import { checkbox } from '@keystone-next/fields';

export const permissionFields = {
  canManageProducts: checkbox({
    defaultValue: false,
    label: 'User can update and delete products',
  }),
  canSeeOtherUsers: checkbox({
    defaultValue: false,
    label: 'User can query other users',
  }),
  canManageUsers: checkbox({
    defaultValue: false,
    label: 'User can edit other users',
  }),
  canManageRoles: checkbox({
    defaultValue: false,
    label: 'User has CRUD roles',
  }),
  canManageCart: checkbox({
    defaultValue: false,
    label: 'User can see and manage cart and cart items',
  }),
  canManageOrders: checkbox({
    defaultValue: false,
    label: 'User can see and manage orders',
  }),
};

export type Permission = keyof typeof permissionFields;

export const permissionsList: Permission[] = Object.keys(
  permissionFields
) as Permission[];