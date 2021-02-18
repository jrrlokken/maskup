import Page from '../components/Page';
import { configure, shallow, mount } from 'enzyme';
import Adapter from '@hteker/enzyme-adapter-react-17';
import { MockedProvider } from '@apollo/client/testing';
import { CartStateProvider } from '../lib/cartState';

configure({ adapter: new Adapter() });

describe('<Page/>', () => {
  it('renders and matches the snapshot', () => {
    const wrapper = shallow(
      <MockedProvider>
        <Page />
      </MockedProvider>
    );
    expect(wrapper.debug()).toMatchSnapshot();
  });
  it('renders children', () => {
    const Child = () => <p>I thought I was a child</p>
    const wrapper = mount(
      <MockedProvider>
        <CartStateProvider>
          <Page>
            <Child />
          </Page>
        </CartStateProvider>
      </MockedProvider>
    );
    const child = wrapper.find('Child');
    expect(child.text()).toBe('I thought I was a child');
  });
});
