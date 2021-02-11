import ProductComponent from '../components/Product';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const fakeProduct = {
  id: 'abc123',
  name: 'Test Product',
  price: 1499,
  description: 'This is a test product',
  photo: {
    image: {
      publicUrlTransformed: 'dog.jpg'
    }
  }
};

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
    console.log(buttonList.debug());
  });
});
