import { configure, mount } from 'enzyme';
import Adapter from '@hteker/enzyme-adapter-react-17';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from '@apollo/client/testing';
import { ApolloConsumer } from '@apollo/client';
import { act } from 'react-dom/test-utils';
import wait from 'waait';

import { Checkout, CREATE_ORDER_MUTATION } from '../components/Checkout';
import { CURRENT_USER_QUERY } from '../components/User';
import { CartStateProvider } from '../lib/cartState';
import { fakeCartItem, fakeUser, fakeOrder, fakeOrderItem } from '../lib/testUtils';

configure({ adapter: new Adapter() });

const mocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: {
      me: {
        ...fakeUser(),
        cart: [fakeCartItem()]
      }
    }}
  },
  {
    request: { 
      query: CREATE_ORDER_MUTATION,
      checkout: {
        variables: { token: 'aabbcc123' }
      }
    },
    result: {
      data: {
        id: fakeOrder.id,
        charge: fakeOrder.charge,
        total: fakeOrder.total,
        items: {
          id: fakeOrderItem.id,
          name: fakeOrderItem.name
        }
      }
    }
  }
];

describe('<Checkout/>', () => {
  it('renders and matches snapshot', async () => {
    let apolloClient;
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CartStateProvider>
          <Checkout />
        </CartStateProvider>
      </MockedProvider>
    );
    expect(toJSON(wrapper.find('button'))).toMatchSnapshot();
  });
  it('creates an order on submit', async () => {
    // const crea
    let apolloClient;
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CartStateProvider cartOpen={true}>
          <ApolloConsumer>
          {client => {
            apolloClient = client;
            return <Checkout />;
          }}
          </ApolloConsumer>
        </CartStateProvider>
      </MockedProvider>
    );
    const component = wrapper.find('Checkout');
    console.log(toJSON(component));
    await act(async () => {
      await wait();
      wrapper.find
      
    });
  });
});
