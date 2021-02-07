import styled from 'styled-components';
import { useCart } from '../lib/cartState';
import { useUser } from './User';
import CartStyles from './styles/CartStyles';
import Heading from './styles/Heading';
import CloseButton from './styles/CloseButton';
import { Checkout } from './Checkout';
import RemoveFromCart from './RemoveFromCart';
import calcTotalPrice from '../lib/calcTotalPrice';
import formatMoney from '../lib/formatMoney';

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid var(--lightGrey);
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

const CartItem = ({ cartItem }) => {
  const { product } = cartItem;
  if (!product) return null;

  return (
    <CartItemStyles>
      <img
        width='100'
        src={product.photo.image.publicUrlTransformed}
        alt={product.name}
      />
      <div>
        <h3>{product.name}</h3>
        <p>
          {formatMoney(product.price * cartItem.quantity)}-
          <em>
            {cartItem.quantity} &times; {formatMoney(product.price)} each
          </em>
        </p>
      </div>
      <RemoveFromCart id={cartItem.id} />
    </CartItemStyles>
  );
}
const Cart = () => {
  const me = useUser();
  const { cartOpen, closeCart } = useCart();
  if (!me) return null;

  return (
    <CartStyles open={cartOpen}>
      <header>
        <Heading>{me.name}'s Cart</Heading>
        <CloseButton onClick={closeCart}>&times;</CloseButton>
      </header>
      <ul>
        {me.cart.map(cartItem => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalPrice(me.cart))}</p>
        <Checkout />
      </footer>
    </CartStyles>
  );
}

export default Cart;