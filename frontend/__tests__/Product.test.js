import { configure, mount } from 'enzyme';
import Adapter from '@hteker/enzyme-adapter-react-17';
import { MockedProvider } from '@apollo/client/testing';
import toJSON from 'enzyme-to-json';

import Product from '../components/Product';
import AddToCart from '../components/AddToCart';
import { fakeProduct } from '../lib/testUtils';

configure({ adapter: new Adapter() });

describe('<Product/>', () => {
  it('renders and matches snapshot', () => {
    const wrapper = mount(
      <MockedProvider>
        <Product product={fakeProduct}/>
      </MockedProvider>
    );
    const PriceTag = wrapper.find('PriceTag');
    const Title = wrapper.find('Title');
    const buttonList = wrapper.find('.buttonList');

    expect(toJSON(PriceTag)).toMatchSnapshot();
    expect(toJSON(Title)).toMatchSnapshot();
    expect(toJSON(buttonList)).toMatchSnapshot();

    expect(PriceTag.text()).toBe('$14.99');
    expect(Title.text()).toBe(fakeProduct.name);
    expect(buttonList.containsMatchingElement(<AddToCart/>)).toBe(true);
  });
});
