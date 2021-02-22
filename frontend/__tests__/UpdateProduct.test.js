import { configure, mount } from 'enzyme';
import Adapter from '@hteker/enzyme-adapter-react-17';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from '@apollo/client/testing';
import { act } from 'react-dom/test-utils';
import wait from 'waait';

import UpdateProduct, { UPDATE_PRODUCT_MUTATION } from '../components/UpdateProduct';
import { SINGLE_ITEM_QUERY, SINGLE_PRODUCT_QUERY } from '../components/SingleProduct';
import { fakeProduct } from '../lib/testUtils';

configure({ adapter: new Adapter() });

const mocks = [
  {
    request: {
      query: UPDATE_PRODUCT_MUTATION,
      variables: {
        id: fakeProduct.id,
        name: fakeProduct.name,
        description: fakeProduct.description,
        price: fakeProduct.price
      }
    },
    result: {
      data: {
        updateProduct: {
          id: fakeProduct.id,
          data: {
            name: fakeProduct.name,
            description: fakeProduct.description,
            price: fakeProduct.price
          }
        }
      }
    },
  },
  {
    request: { query: SINGLE_ITEM_QUERY },
    result: {
      data: {
        Product: fakeProduct
      }
    }
  }
];

describe('<UpdateProduct/>', () => {
  it('renders and matches snapshot', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <UpdateProduct id={fakeProduct.id}/>
      </MockedProvider>
    );
    const component = wrapper.find('UpdateProduct');
    expect(toJSON(component)).toMatchSnapshot();
  });
});
