import { configure, mount } from 'enzyme';
import Adapter from '@hteker/enzyme-adapter-react-17';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from '@apollo/client/testing';
import { ApolloConsumer } from '@apollo/client';
import { act } from 'react-dom/test-utils';
import wait from 'waait';

import Signin, { SIGNIN_MUTATION } from '../components/Signin';
import { CURRENT_USER_QUERY } from '../components/User';
import { type, fakeUser } from '../lib/testUtils';

configure({ adapter: new Adapter() });

const me = fakeUser();

const mocks = [
  {
    request: {
      query: SIGNIN_MUTATION,
      variables: {
        authenticateUserWithPassword: {
          email: me.email,
          password: 'password'
        }
      }
    },
    result: {
      data: {
        signin: {
          id: 'abc123',
          email: me.email,
          name: me.name
        }
      }
    }
  },
  {
    request: { query: CURRENT_USER_QUERY },
    result: { 
      data: { me }
    }
  }
];

describe('<Signin/>', () => {
  it('renders and matches snapshot', () => {
    const wrapper = mount(
      <MockedProvider>
        <Signin />
      </MockedProvider>
    );
    expect(wrapper.find('h2').text()).toBe('Sign into your account');
    expect(toJSON(wrapper.find('form'))).toMatchSnapshot();
  });
});