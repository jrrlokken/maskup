import { configure, mount } from 'enzyme';
import Adapter from '@hteker/enzyme-adapter-react-17';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from '@apollo/client/testing';
import { act } from 'react-dom/test-utils';
import wait from 'waait';

import DeleteProduct, { DELETE_PRODUCT_MUTATION } from '../components/DeleteProduct';
import { fakeProduct } from '../lib/testUtils';

configure({ adapter: new Adapter() });
window.confirm = jest.fn(() => true);

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
  it('renders and matches snapshot', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <DeleteProduct id={fakeProduct.id}/>
      </MockedProvider>
    );
    const component = wrapper.find('DeleteProduct');
    expect(toJSON(component)).toMatchSnapshot();
  });
});
