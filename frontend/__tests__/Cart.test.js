import { configure, mount } from 'enzyme';
import Adapter from '@hteker/enzyme-adapter-react-17';
import { MockedProvider } from '@apollo/client/testing';
import Cart from '../components/Cart';
import { CartStateProvider } from '../lib/cartState';
import { fakeCartItem, fakeUser } from '../lib/testUtils';
import { CURRENT_USER_QUERY } from '../components/User';

configure({ adapter: new Adapter() });

const mocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: 
      { me: fakeUser(), cartItem: fakeCartItem() },
    }
  }
];

describe('<Cart/>', () => {
  it('renders and matches snapshot', () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CartStateProvider>
          <Cart />
        </CartStateProvider>
      </MockedProvider>
    );
    expect(wrapper.debug()).toMatchSnapshot();
  });
});