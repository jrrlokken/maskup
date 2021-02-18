import Header from '../components/Header';
import { configure, shallow } from 'enzyme';
import Adapter from '@hteker/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });

describe('<Header/>', () => {
  it('matches the snapshot and renders the logo', () => {
    const wrapper = shallow(
      <Header />
    );
    expect(wrapper).toMatchSnapshot();
    const logo = wrapper.find('#logo');
    expect(logo.text()).toBe('Mask Up!');
    
  });
});
