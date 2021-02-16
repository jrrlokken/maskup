import ProductComponent from '../components/Product';
import { configure, shallow } from 'enzyme';
import Adapter from '@hteker/enzyme-adapter-react-17';
import { fakeProduct } from '../lib/testUtils';

configure({ adapter: new Adapter() });

describe('<Product />', () => {
  it('renders the pricetag and title', () => {
    const wrapper = shallow(<ProductComponent product={fakeProduct}/>);
    const PriceTag = wrapper.find('PriceTag');
    expect(PriceTag.dive().text()).toBe('$14.99');
    expect(wrapper.find('Title Link').dive().text()).toBe(fakeProduct.name);
  });

  it('renders the product image', () => {
    const wrapper = shallow(<ProductComponent product={fakeProduct}/>);
    const img = wrapper.find('img');
    expect(img.props().src).toBe(fakeProduct.photo.image.publicUrlTransformed);
    expect(img.props().alt).toBe(fakeProduct.name);
  });

  it('renders the buttons properly', () => {
    const wrapper = shallow(<ProductComponent product={fakeProduct}/>);
    const buttonList = wrapper.find('.buttonList');
  });
});
