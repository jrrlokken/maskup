import { configure, mount } from 'enzyme';
import Adapter from '@hteker/enzyme-adapter-react-17';
import { MockedProvider } from '@apollo/client/testing';
import { act } from 'react-dom/test-utils';
import wait from 'waait';

import Nav from '../components/Nav';
import { CURRENT_USER_QUERY } from '../components/User';
import { CartStateProvider } from '../lib/cartState';
import { fakeUser } from '../lib/testUtils';

configure({ adapter: new Adapter() });

const notSignedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me: null } }
  },
];

const signedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { user: fakeUser() } }
  },
];


describe('<Nav/>', () => {
  it('renders and matches snapshot', () => {
    const wrapper = mount(
      <MockedProvider mocks={notSignedInMocks} addTypename={false}>
        <CartStateProvider>
          <Nav />
        </CartStateProvider>
      </MockedProvider>
    );
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.text()).toContain('Sign In')
  });
  it('renders proper links when signed in', async () => {
    const wrapper = mount(
      <MockedProvider mocks={signedInMocks} addTypename={false}>
        <CartStateProvider>
          <Nav />
        </CartStateProvider>
      </MockedProvider>
    );
    await act(async () => {
      await wait();
      wrapper.update();
      console.log(wrapper.debug());
      
    });
  });
});
