import { configure, mount } from 'enzyme';
import Adapter from '@hteker/enzyme-adapter-react-17';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from '@apollo/client/testing';
import { act } from 'react-dom/test-utils';
import wait from 'waait';

import SingleProduct, { SINGLE_ITEM_QUERY } from '../components/SingleProduct';
import AddToCart from '../components/AddToCart';
import { fakeProduct } from '../lib/testUtils';

configure({ adapter: new Adapter() });

const mocks = [
  {
    request: { query: SINGLE_ITEM_QUERY },
    result: {
      data: { Product: fakeProduct }
    }
  }
];

describe('<SingleProduct/>', () => {
  it('renders and matches snapshot', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SingleProduct id={fakeProduct.id} />
      </MockedProvider>
    );
    expect(wrapper.find('p').text()).toBe('Loading...');
    const component = wrapper.find('SingleProduct');
    console.log(component.debug());
    expect(toJSON(component)).toMatchSnapshot();
    await act(async () => {
      await wait();
      wrapper.update();
    });
  });
})

