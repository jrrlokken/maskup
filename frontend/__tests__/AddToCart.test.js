import { configure, shallow, mount } from 'enzyme';
import Adapter from '@hteker/enzyme-adapter-react-17';
import { MockedProvider } from '@apollo/client/testing';
import { ApolloConsumer } from '@apollo/client';
import toJSON from 'enzyme-to-json';
import { act } from 'react-dom/test-utils';
import wait from 'waait';

import AddToCart, { ADD_TO_CART_MUTATION } from '../components/AddToCart';
import { fakeCartItem, fakeProduct, fakeUser } from '../lib/testUtils';
import { CURRENT_USER_QUERY } from '../components/User';

configure({ adapter: new Adapter() });

const mocks = [
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
  { request: { query: CURRENT_USER_QUERY },
    result: {
      data: {
        me: {
          ...fakeUser(),
          cart: [fakeCartItem()],
        }
      }
    }
  },
  {
    request: { 
      query: ADD_TO_CART_MUTATION,
      variables: { id: fakeProduct.id }
    },
    result: {
      data: {
        addToCart: {
          ...fakeCartItem(),
          quantity: 1
        }
      }
    }
  }, 
];

describe('<AddToCart/>', () => {
  it('renders and matches snapshot', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AddToCart id={fakeProduct.id}/>
      </MockedProvider>
    );
    await act(async () => {
      await wait();
      wrapper.update();
      expect(toJSON(wrapper.find('button'))).toMatchSnapshot();
    });
  });
  it('adds an item to cart when clicked', async () => {
    let apolloClient;
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ApolloConsumer>
        {client => {
            apolloClient = client;
            return <AddToCart id={fakeProduct.id} />;
          }}
        </ApolloConsumer>
      </MockedProvider>
    );
    await act(async () => {
      await wait();
      wrapper.update();
      const { data: { me } } = await apolloClient.query({ query: CURRENT_USER_QUERY });
      expect(me.cart).toHaveLength(0);
      // add an item to cart
      wrapper.find('button').simulate('click');
      await wait();
      // check if the item is in the cart
      const { data: { me: me2 } } = await apolloClient.query({ query: CURRENT_USER_QUERY });
      expect(me2.cart).toHaveLength(1);
      expect(me2.cart[0].id).toBe('omg123');
      expect(me2.cart[0].quantity).toBe(3);
    });
  });
  it('button text changes when adding item to cart', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <AddToCart id={fakeProduct.id} />
      </MockedProvider>
    );
    await act(async () => {
      await wait();
      wrapper.update();
      expect(wrapper.text()).toContain('Add To Cart');
      wrapper.find('button').simulate('click');
      expect(wrapper.text()).toContain('Adding To Cart');
    });
  });
});
