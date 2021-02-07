import 'dotenv/config';
import { cloudinaryImage } from '@keystone-next/cloudinary';
import { relationship, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

import { isSignedIn, permissions } from '../access';

export const cloudinary = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_KEY,
  apiSecret: process.env.CLOUDINARY_SECRET,
  folder: 'maskup',
};

export const ProductImage = list({
  access: {
    create: isSignedIn,
    read: () => true,
    update: permissions.canManageProducts,
    delete: permissions.canManageProducts,
  },
  fields: {
    product: relationship({ ref: 'Product.photo' }),
    image: cloudinaryImage({
      cloudinary,
      label: 'Source',
    }),
    altText: text(),
  },
  ui: {
    listView: {
      initialColumns: ['image', 'altText', 'product'],
    },
  },
});