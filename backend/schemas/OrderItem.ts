import { text, relationship, integer } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { isSignedIn, rules } from '../access';

export const OrderItem = list({
  access: {
    create: isSignedIn,
    read: rules.canManageOrderItems,
    update: () => false,
    delete: () => false,
  },
  fields: {
    name: text({ isRequired: true }),
    order: relationship({ ref: 'Order.items' }),
    description: text({ ui: { displayMode: 'textarea' } }),
    price: integer(),
    quantity: integer(),
    photo: relationship({
      ref: 'ProductImage',
      ui: { 
        displayMode: 'cards',
        cardFields: ['image', 'altText'],
        inlineCreate: { fields: ['image', 'altText'] },
        inlineEdit: { fields: ['image', 'altText'] },
      },
    }),
  },
});