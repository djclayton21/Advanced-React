import PropTypes from 'prop-types';
import styled from 'styled-components';
import CartStyles from './styles/CartStyles';
import { useUser } from './User';
import Supreme from './styles/Supreme';
import formatMoney from '../lib/formatMoney';
import calcTotalPrice from '../lib/calcTotalPrice';

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid var(--lightgrey);
  display: grid;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 1rem;
  }
  h3,
  p {
    margin: 0;
  }
`;

function CartItem({ cartItem }) {
  const { product } = cartItem;
  return (
    <CartItemStyles>
      <img
        width="100px"
        src={product.photo.image.publicUrlTransformed}
        alt={product.name}
      />
      <div>
        <h3>{product.name}</h3>
        <p>{formatMoney(product.price * cartItem.quantity)} - </p>
        <em>
          {cartItem.quantity} &times; {formatMoney(product.price)}
        </em>
      </div>
    </CartItemStyles>
  );
}

export default function Cart() {
  const user = useUser();
  if (!user) return null;
  return (
    <CartStyles open>
      <header>
        <Supreme>{user.name}'s Cart</Supreme>
      </header>
      <ul>
        {user.cart.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalPrice(user.cart))}</p>
      </footer>
    </CartStyles>
  );
}

CartItem.propTypes = {
  cartItem: PropTypes.shape({
    id: PropTypes.string.isRequired,
    product: PropTypes.object,
    quantity: PropTypes.number,
  }),
};
