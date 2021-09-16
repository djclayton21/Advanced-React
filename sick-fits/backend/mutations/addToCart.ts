/* eslint-disable */
import { KeystoneContext } from '@keystone-next/types';
import { Session } from '../types';

export default async function addToCart(
  root: any,
  { productId }: { productId: string },
  context: KeystoneContext
) {
  // query current user and see if signed in
  const sesh = context.session as Session;
  if (!sesh.itemId) {
    throw new Error('You must be logged in to add an item');
  }
  // get current users cart
  // see if current item is in cart
  const allCartItems = await context.lists.CartItem.findMany({
    where: { user: { id: sesh.itemId }, product: { id: productId } },
    resolveFields: 'id,quantity'
  });
  const [existingCartItem] = allCartItems;
  // if it is, increment
  if (existingCartItem) {
    console.log(`there is already ${existingCartItem.quantity}, incrementing`)
    return await context.lists.CartItem.updateOne({
      id: existingCartItem.id,
      data: { quantity: existingCartItem.quantity + 1 },
    });
  }
  // if not, create new cart item
  if (!existingCartItem) {
    console.log('adding new item!')
    return await context.lists.CartItem.createOne({
      data: {
        product: { connect: { id: productId } },
        user: { connect: { id: sesh.itemId } }
      },
    })
  }
}
