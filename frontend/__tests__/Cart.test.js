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
  it('renders and matches snapshot', async () => {
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
      await wait();
      wrapper.update();
    });
  });
});