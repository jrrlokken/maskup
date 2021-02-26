import { configure, mount } from 'enzyme';
import Adapter from '@hteker/enzyme-adapter-react-17';
import { MockedProvider } from '@apollo/client/testing';
import { ApolloConsumer } from '@apollo/client';
import toJSON from 'enzyme-to-json';
import { act } from 'react-dom/test-utils';
import wait from 'waait';

import Cart from '../components/Cart';
import { CartStateProvider } from '../lib/cartState';
import { fakeCartItem, fakeUser } from '../lib/testUtils';
import { CURRENT_USER_QUERY } from '../components/User';

configure({ adapter: new Adapter() });

const mocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me: {
      ...fakeUser(),
      cart: [ fakeCartItem() ]
    }}}
  }
];

describe('<Cart/>', () => {
  it('renders and matches snapshot', () => {
    const wrapper=mount(
      <MockedProvider>
        <CartStateProvider>
          <Cart />
        </CartStateProvider>
      </MockedProvider>
    );
    expect(toJSON(wrapper.find('Cart'))).toMatchSnapshot();
  });
  it('renders cart items for user', async () => {
    let apolloClient;
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ApolloConsumer>
          {client => {
            apolloClient = client;
            return (
              <CartStateProvider cartOpen={true}>
                <Cart />
              </CartStateProvider>
            );
          }}
        </ApolloConsumer>
      </MockedProvider>
    );
    await act(async () => {
      const { data: { me } } = await apolloClient.query({ query: CURRENT_USER_QUERY });
      expect(me.cart).toHaveLength(1);
      expect(me.cart[0].id).toBe('omg123');
      expect(me.cart[0].product.description).toBe('This is a test product');
    });
  });
});