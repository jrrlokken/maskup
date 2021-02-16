import { configure, mount } from 'enzyme';
import Adapter from '@hteker/enzyme-adapter-react-17';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from '@apollo/client/testing';
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
      data: { sendUserPasswordResetLink: { code: resetToken, message: 'success' } },
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
})
