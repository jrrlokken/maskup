import { configure, mount } from 'enzyme';
import Adapter from '@hteker/enzyme-adapter-react-17';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from '@apollo/client/testing';
import { ApolloConsumer } from '@apollo/client';
import { act } from 'react-dom/test-utils';
import wait from 'waait';

import Signup, { SIGNUP_MUTATION } from '../components/Signup';
import { CURRENT_USER_QUERY } from '../components/User';
import { fakeUser } from '../lib/testUtils';

configure({ adapter: new Adapter() });

function type(wrapper, name, value) {
  wrapper.find(`input[name='${name}']`).simulate('change', {
    target: { name, value },
  });
}

const me = fakeUser();
const mocks = [
  {
    request: {
      query: SIGNUP_MUTATION,
      variables: {
        email: me.email,
        name: me.name,
        password: 'password'
      }
    },
    result: {
      data: {
        signup: {
          id: 'abc123',
          email: me.email,
          name: me.name,
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

describe('<Signup/>', () => {
  it('renders and matches snapshot', () => {
    const wrapper = mount(
      <MockedProvider>
        <Signup />
      </MockedProvider>
    );
    expect(wrapper.find('h2').text()).toBe('Sign up for an account');
    expect(toJSON(wrapper.find('form'))).toMatchSnapshot();
  });
  it('calls the mutation properly', async () => {
    let apolloClient;
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ApolloConsumer>
          {client => {
            apolloClient = client;
            return <Signup />;
          }}
        </ApolloConsumer>
      </MockedProvider>
    );
    await act(async () => {
      await wait();
      wrapper.update();
      type(wrapper, 'name', me.name);
      type(wrapper, 'email', me.email);
      type(wrapper, 'password', 'password');
      wrapper.update();
      wrapper.find('form').simulate('submit');
      await wait();
      const user = await apolloClient.query({ query: CURRENT_USER_QUERY });
      expect(user.data.me).toMatchObject(me);
    });
  });
});
