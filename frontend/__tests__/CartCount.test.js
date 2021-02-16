import CartCount from '../components/CartCount';
import { configure, shallow } from 'enzyme';
import Adapter from '@hteker/enzyme-adapter-react-17';
import toJSON from 'enzyme-to-json';

configure({ adapter: new Adapter() });

describe('<CartCount/>', () => {
  it('renders properly', () => {
    const wrapper = shallow(
      <CartCount count={10} />
    );
    const badge = wrapper.find('CartCount__Badge');
    expect(badge.text()).toBe('10');
    expect(toJSON(wrapper)).toMatchSnapshot();
  })
})


