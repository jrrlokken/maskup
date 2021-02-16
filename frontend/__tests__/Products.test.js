import Products from '../components/Products';
import { configure, shallow } from 'enzyme';
import Adapter from '@hteker/enzyme-adapter-react-17';
import { MockedProvider } from '@apollo/client/testing';
import { fakeProduct } from '../lib/testUtils';

configure({ adapter: new Adapter() });

describe('<Products/>', () => {
  it('renders and matches snapshot', () => {
    const wrapper = shallow(
      <MockedProvider>
        <Products />
      </MockedProvider>
    );
    expect(wrapper).toMatchSnapshot();  
  });

})
