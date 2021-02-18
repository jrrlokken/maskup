import { configure, mount } from 'enzyme';
import Adapter from '@hteker/enzyme-adapter-react-17';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from '@apollo/client/testing';
// import { Router } from 'next/router';
import '../__mocks__/mocks';
import { act } from 'react-dom/test-utils';
import wait from 'waait';

import DeleteProduct, { DELETE_PRODUCT_MUTATION } from '../components/DeleteProduct';
import { fakeProduct } from '../lib/testUtils';

configure({ adapter: new Adapter() });
window.confirm = jest.fn(() => true);
// jest.mock('next/router', () => ({
//   push: jest.fn(),
//   events: {
//     on: jest.fn(),
//     off: jest.fn()
//   },
//   beforePopState: jest.fn(() => null)
// }));

const mocks = [
  {
    request: {
      query: DELETE_PRODUCT_MUTATION,
      variables: fakeProduct.id,
    },
    result: {
      data: {
        id: fakeProduct.id,
        name: fakeProduct.name,
      }
    }
  }
];

describe('<DeleteProduct/>', () => {
  xit('deletes a product', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <DeleteProduct id={fakeProduct.id}/>
      </MockedProvider>
    );
    wrapper.find('button').simulate('click');
    console.log(wrapper.debug());

  });
});
