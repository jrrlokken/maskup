import { configure, shallow } from 'enzyme';
import Adapter from '@hteker/enzyme-adapter-react-17';
import toJSON from 'enzyme-to-json';

import CartCount from '../components/CartCount';

configure({ adapter: new Adapter() });
const count = 10;

describe('<CartCount/>', () => {
  it('renders and matches snapshot', () => {
    const wrapper = shallow(
      <CartCount count={count}/>
    );
    const badge = wrapper.find('CartCount__Badge');
    expect(badge).toMatchSnapshot();
    expect(badge.text()).toBe('10');
  });
});
