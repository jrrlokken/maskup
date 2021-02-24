import { configure, mount } from 'enzyme';
import Adapter from '@hteker/enzyme-adapter-react-17';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from '@apollo/client/testing';
import { act } from 'react-dom/test-utils';
import wait from 'waait';

import UpdateProduct, { UPDATE_PRODUCT_MUTATION } from '../components/UpdateProduct';
import { SINGLE_ITEM_QUERY } from '../components/SingleProduct';
import { fakeProduct } from '../lib/testUtils';

configure({ adapter: new Adapter() });

const mocks = [
  {
    request: { 
      query: SINGLE_ITEM_QUERY,
      variables: { id: fakeProduct.id }
    },
    result: {
      data: { Product: fakeProduct }
    }
  },
  // {
  //   request: {
  //     query: UPDATE_PRODUCT_MUTATION,
  //     variables: {
  //       id: fakeProduct.id,
  //       name: fakeProduct.name,
  //       description: fakeProduct.description,
  //       price: fakeProduct.price
  //     }
  //   },
  //   result: {
  //     data: {
  //       updateProduct: {
  //         id: fakeProduct.id,
  //         data: {
  //           name: 'Test Product Update',
  //           description: 'Updated Description',
  //           price: 2199
  //         }
  //       }
  //     }
  //   },
  // },
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
  it('calls the mutation and updates the product', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <UpdateProduct id={fakeProduct.id}/>
      </MockedProvider>
    );
    await act(async () => {
      await wait();
      wrapper.update();
      console.log(wrapper.debug());
    });
  });
});
