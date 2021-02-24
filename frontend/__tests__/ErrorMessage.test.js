import { configure, shallow } from 'enzyme';
import Adapter from '@hteker/enzyme-adapter-react-17';
import toJSON from 'enzyme-to-json';
import DisplayError from '../components/ErrorMessage';

configure({ adapter: new Adapter() });

const error = {
  message: 'Error!'
}

describe('<DisplayError/>', () => {
  it('renders properly and matches snapshot', () => {
    const wrapper = shallow(
      <DisplayError error={error} />
    );
    expect(wrapper.find('strong').text()).toBe('Oops!');
    const ptext = wrapper.find('p').text();
    expect(ptext).toBe('Oops!Error!');
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
