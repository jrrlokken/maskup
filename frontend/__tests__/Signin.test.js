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
  it('calls the mutation properly', async () => {
    let apolloClient;
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ApolloConsumer>
          {client => {
            apolloClient = client;
            return <Signin />;
          }}
        </ApolloConsumer>
      </MockedProvider>
    );
    await act(async () => {
      await wait();
      wrapper.update();
      type(wrapper, 'email', me.email);
      type(wrapper, 'password', 'password');
      wrapper.update();
      wrapper.find('form').simulate('submit');
      await wait();
      // const user = await apolloClient.query({ query: CURRENT_USER_QUERY });
      // console.log(user);
      // expect(user.data.me).toMatchObject(me);
    });
  });
});