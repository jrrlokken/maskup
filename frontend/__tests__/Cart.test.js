import { configure, mount } from 'enzyme';
import Adapter from '@hteker/enzyme-adapter-react-17';
import MockedProvider from '@apollo/client/testing';
import Cart from '../components/Cart';
import { fakeCartItem, fakeUser } from '../lib/testUtils';

configure({ adapter: new Adapter() });

describe.skip('<Cart/>', () => {
  it('renders without crashing', () => {
    const wrapper = mount(
      <MockedProvider>
        <Cart />);
      </MockedProvider>
    );
    console.log(wrapper.debug());
  })
})