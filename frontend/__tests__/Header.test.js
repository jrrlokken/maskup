import { configure, shallow } from 'enzyme';
import Adapter from '@hteker/enzyme-adapter-react-17';
import toJSON from 'enzyme-to-json';

import Header from '../components/Header';

configure({ adapter: new Adapter() });

describe('<Header/>', () => {
  it('renders the logo and matches snapshotu', () => {
    const wrapper = shallow(
      <Header />
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
    const logo = wrapper.find('#logo');
    expect(logo.text()).toBe('Mask Up!');
  });
});
