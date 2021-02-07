import { permissionsList } from './schemas/fields';
import { ListAccessArgs } from './types';

/*
  The basic level of access to the system is being signed in as a valid user. This gives you access
  to the Admin UI, access to your own User and Todo items, and read access to roles.
*/
export const isSignedIn = ({ session }: ListAccessArgs) => {
  return !!session;
};

const generatedPermissions = Object.fromEntries(
  permissionsList.map(permission => [
    permission,
    function ({ session }: ListAccessArgs) {
      // Do they have that permission?
      return !!session?.data.role?.[permission];
    },
  ])
);

export const permissions = {
  ...generatedPermissions,
  isGod({ session }: ListAccessArgs): boolean {
    return session?.data.name.includes('joshua');
  },
};

export const rules = {
  canManageProducts({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    if (permissions.canManageProducts({ session })) {
      return true;
    }
    return { user: { id: session.itemId } };
  },
  canOrder({session}: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    if (permissions.canManageCart({ session })) {
      return true;
    }
    return { user: { id: session.itemId } }; 
  },
  canManageOrderItems({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    if (permissions.canManageCart({ session })) {
      return true;
    }
    return { order: { user: { id: session.itemId } } };
  },
  canReadProducts({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    if (permissions.canManageProducts({ session })) {
      return true;
    }
    return { status: 'AVAILABLE' };
  },
  canManageUsers({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    if (permissions.canManageUsers({ session })) {
      return true;
    }
    return { id: session.itemId };
  },
};