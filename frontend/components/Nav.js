import Link from 'next/link';
import NProgress from 'nprogress';

import { useUser } from './User';
import NavStyles from './styles/NavStyles';
import  { useCart } from '../lib/cartState';
import CartCount from './CartCount';
import Signout from './Signout';

const Nav = () => {
  const user = useUser();
  const { openCart } = useCart();
  return (
    <NavStyles>
      <Link href='/products'>Products</Link>
      {user && (
        <>
          <Link href='/sell'>Sell</Link>
          <Link href='/orders'>Orders</Link>
          <Signout />
          <button type='button' onClick={openCart}>
            My Cart
            <CartCount
              count={user.cart.reduce(
                (tally, cartItem) => tally + (cartItem.product ? cartItem.quantity : 0), 0
              )}
            />
          </button>
        </>
      )}  
      {!user && (
        <>
          <Link href='/signin'>Sign In</Link>
          <Link href='/signup'>Sign Up</Link>
        </>
      )}
    </NavStyles>
  );
}

export default Nav;