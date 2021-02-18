import { configure, mount } from 'enzyme';
import Adapter from '@hteker/enzyme-adapter-react-17';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from '@apollo/client/testing';
import { act } from 'react-dom/test-utils';
import wait from 'waait';

import RequestReset, { REQUEST_RESET_MUTATION } from '../components/RequestReset';

configure({ adapter: new Adapter() });

const resetToken = 'asdfkjksladfjaksdfj';

const mocks = [
  {
    request: {
      query: REQUEST_RESET_MUTATION,
      variables: { email: 'joshualokken@pm.me' },
    },
    result: {
      data: { 
        sendUserPasswordResetLink: null
      },
    }
  }
];

describe('<RequestReset/>', () => {
  it('renders and matches snapshot', async () => {
    const wrapper = mount(
      <MockedProvider>
        <RequestReset />
      </MockedProvider>
    );
    const form = wrapper.find('form[data-test="form"]');
    expect(toJSON(form)).toMatchSnapshot();
  });
  it('calls the mutation', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RequestReset />
      </MockedProvider>
    );
    wrapper
      .find('input')
      .simulate('change', { target: { name: 'email', value: 'joshualokken@pm.me'} });
    wrapper.find('form').simulate('submit');
    await act(async () => {
      await wait();
      wrapper.update();
      expect(wrapper.find('p').text()).toContain('Success! Check your email for a reset link.');
    });
  });
});
