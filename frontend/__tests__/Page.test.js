import Page from '../components/Page';
import { configure, mount } from 'enzyme';
import Adapter from '@hteker/enzyme-adapter-react-17';
import { MockedProvider } from '@apollo/client/testing';

configure({ adapter: new Adapter() });

describe('<Page/>', () => {
  it('renders and matches the snapshot', () => {
    const wrapper = mount(
      <MockedProvider>
        <Page children={null} />
      </MockedProvider>
    );
    console.log(wrapper.debug());
    expect(wrapper).toMatchSnapshot();
  })
})
