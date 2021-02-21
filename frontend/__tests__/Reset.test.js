import { configure, mount } from 'enzyme';
import Adapter from '@hteker/enzyme-adapter-react-17';
import toJSON from 'enzyme-to-json';
import { act } from 'react-dom/test-utils';
import wait from 'waait';
import { MockedProvider } from '@apollo/client/testing';
import { fakeProduct } from '../lib/testUtils';

import Reset, { RESET_MUTATION } from '../components/Reset';

configure({ adapter: new Adapter() });

const token = 'asdfjaskdlasdflkjasldf';

const mocks = [
  {
    request: { 
      query: RESET_MUTATION,
      variables: {
        redeemUserPasswordResetToken: {
          token,
          email: 'joshualokken@pm.me',
          password: 'password'
        }
      }
    },
    result: {
      code: undefined,
      message: 'Message'
    }
  }
];

describe('<Reset/>', () => {
  it('renders and matches snapshot', () => {
    const wrapper = mount(
      <MockedProvider>
        <Reset />
      </MockedProvider>
    );
    const form = wrapper.find('form');
    expect(toJSON(form)).toMatchSnapshot();
    expect(form.find('h2').text()).toBe('Reset your password');
    expect(form.find('button').text()).toBe('Reset');
  });
  it('calls the mutation', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Reset />
      </MockedProvider>
    );
    wrapper.find('button').simulate('click');
    await act(async () => {
      await wait();
      wrapper.update();
    });
    console.log(wrapper.debug());
  })
});
