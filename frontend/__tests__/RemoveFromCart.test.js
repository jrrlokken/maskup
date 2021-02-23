import { configure, mount } from 'enzyme';
import Adapter from '@hteker/enzyme-adapter-react-17';
import { MockedProvider } from '@apollo/client/testing';
import { ApolloConsumer } from '@apollo/client';
import toJSON from 'enzyme-to-json';
import { act } from 'react-dom/test-utils';
import wait from 'waait';

import RemoveFromCart, { REMOVE_FROM_CART_MUTATION } from '../components/RemoveFromCart';
import { fakeCartItem, fakeProduct, fakeUser } from '../lib/testUtils';
import { CURRENT_USER_QUERY } from '../components/User';

configure({ adapter: new Adapter() });

const mocks = [
  { request: { query: CURRENT_USER_QUERY },
    result: {
      data: {
        me: {
          ...fakeUser(),
          cart: [fakeCartItem({ id: 'abc123' })],
        }
      }
    }
  },
  { request: { query: CURRENT_USER_QUERY },
    result: {
      data: {
        me: {
          ...fakeUser(),
          cart: [],
        }
      }
    }
  },
  {
    request: { 
    query: REMOVE_FROM_CART_MUTATION,
      variables: { id: 'abc123' }
    },
    result: {
      data: {
        deleteCartItem: { id: 'abc123' }
      }
    }
  }, 
];

describe('<RemoveFromCart/>', () => {
  it('renders and matches snapshot', () => {
    const wrapper = mount(
      <MockedProvider>
        <RemoveFromCart />
      </MockedProvider>
    );
    expect(toJSON(wrapper.find('button'))).toMatchSnapshot();
  });
  it('removes item from cart', async () => {
    let apolloClient;
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ApolloConsumer>
        {client => {
            apolloClient = client;
            return <RemoveFromCart id='abc123'/>;
          }}
        </ApolloConsumer>
      </MockedProvider>
    );
    const { data: { me } } = await apolloClient.query({ query: CURRENT_USER_QUERY });
    expect(me.cart).toHaveLength(1);
    expect(me.cart[0].product.price).toBe(1499);
    // remove item from cart
    wrapper.find('button').simulate('click');
    // const { data: { me: me2 }} = await apolloClient.query({ query: CURRENT_USER_QUERY });
    // console.log(me2);
  });
});
