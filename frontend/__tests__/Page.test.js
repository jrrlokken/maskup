import Page from '../components/Page';
import { configure, shallow } from 'enzyme';
import Adapter from '@hteker/enzyme-adapter-react-17';
import { MockedProvider } from '@apollo/client/testing';

configure({ adapter: new Adapter() });

describe('<Page/>', () => {
  it('renders and matches the snapshot', () => {
    const wrapper = shallow(
      <MockedProvider>
        <Page />
      </MockedProvider>
    );
    console.log(wrapper.debug());
    expect(wrapper).toMatchSnapshot();
  });
});
