export default function calcTotalPrice(cart) {
  return cart.reduce((count, cartItem) => {
    if (!cartItem.product) return count;
    return count + cartItem.quantity + cartItem.product.price;
  }, 0);
}
