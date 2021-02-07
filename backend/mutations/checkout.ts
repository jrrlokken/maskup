import { User } from '../schemas/User';
import { CartItemCreateInput, OrderCreateInput } from '../.keystone/schema-types';
import { KeystoneContext } from '@keystone-next/types';
import stripeConfig from '../lib/stripe';

const graphql = String.raw;

interface Arguments {
  token: string
}

async function checkout(
  root: any,
  { token }: Arguments,
  context: KeystoneContext
): Promise<OrderCreateInput> {
  // Ensure the user is signed in
  const userId = context.session.itemId;
  if (!userId) throw new Error('You must be signed in');

  const user = await context.lists.User.findOne({
    where: { id: userId },
    resolveFields: graphql`
      id
      name
      email
      cart {
        id
        quantity
        product {
          name
          price
          description
          id
          photo {
            id
            image {
              id
              publicUrlTransformed
            }
          }
        }
      }
    `
  });

  // recalculate total
  const cartItems = user.cart.filter(cartItem => cartItem.product);
  const amount = cartItems.reduce(function(tally: number, cartItem: CartItemCreateInput) {
    return tally + cartItem.quantity * cartItem.product.price;
  }, 0);
  
  // create the charge with the stripe library
  const charge = await stripeConfig.paymentIntents.create({
    amount,
    currency: 'USD',
    confirm: true,
    payment_method: token,
  }).catch(error => {
    throw new Error(error.message);
  });

  // convert cart items to order items
  const orderItems = cartItems.map(cartItem => {
    const orderItem = {
      name: cartItem.product.name,
      description: cartItem.product.description,
      price: cartItem.product.price,
      quantity: cartItem.quantity,
      photo: { connect: { id: cartItem.product.photo.id } },
      // user: { connect: { id: userId } },
    };
    return orderItem;
  });

  // create the order
  const order = await context.lists.Order.createOne({
    data: {
      total: charge.amount,
      charge: charge.id,
      items: { create: orderItems },
      user: { connect: { id: userId } },
    },
  });

  // clear user cart, delete cart items
  const cartItemIds = user.cart.map(cartItem => cartItem.id);
  await context.lists.CartItem.deleteMany({ ids: cartItemIds });
  return order;
}

export default checkout;