import { configure, mount } from 'enzyme';
import Adapter from '@hteker/enzyme-adapter-react-17';
import { MockedProvider } from '@apollo/client/testing';
import toJSON from 'enzyme-to-json';
import { act } from 'react-dom/test-utils';
import wait from 'waait';

import Products, { ALL_PRODUCTS_QUERY } from '../components/Products';
import { fakeProduct } from '../lib/testUtils';

configure({ adapter: new Adapter() });

const mocks = [
  {
    request: {
      query: ALL_PRODUCTS_QUERY,
      variables: {
        skip: 0,
        first: 2
      }
    },
    result: {
      data: {
        
      }
    }
  }
];

describe('<Products/>', () => {
  it('renders and matches snapshot', async () => {
    const wrapper = mount(
      <MockedProvider>
        <Products />
      </MockedProvider>
    );
    const products = wrapper.find('Products');
    expect(toJSON(products)).toMatchSnapshot();
    expect(products.text()).toBe('Loading...');
    
    await act(async () => {
      await wait();
      wrapper.update();
      console.log(wrapper.debug());
    });
  });
});
