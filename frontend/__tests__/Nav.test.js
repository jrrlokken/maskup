import { configure, mount } from 'enzyme';
import Adapter from '@hteker/enzyme-adapter-react-17';
import toJSON from 'enzyme-to-json';
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
    result: { data: { user: null } }
  },
];

const signedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { 
      data: { 
        authenticatedItem: {
          user: fakeUser() 
        } 
      }
    }
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
    const navLinks = wrapper.find('ul');
    expect(toJSON(navLinks)).toMatchSnapshot();
    expect(navLinks.find('a').at(1).text()).toBe('Sign In');
    expect(navLinks.find('a').at(2).text()).toBe('Sign Up');
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
      const navLinks = wrapper.find('ul')
      expect(toJSON(navLinks)).toMatchSnapshot();
      expect(navLinks.find('a').at(0).text()).toBe('Products');
      expect(navLinks.find('a').at(1).text()).toBe('Sell');
      expect(navLinks.find('a').at(2).text()).toBe('Orders');
    });
  });
});
