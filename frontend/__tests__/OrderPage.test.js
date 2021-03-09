import { configure, mount } from 'enzyme';
import Adapter from '@hteker/enzyme-adapter-react-17';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from '@apollo/client/testing';
import { act } from 'react-dom/test-utils';
import wait from 'waait';

import SingleOrderPage, { SINGLE_ORDER_QUERY } from '../pages/order/[id]';
import { fakeOrder } from '../lib/testUtils';

configure({ adapter: new Adapter() });;

const mocks = [
  {
    request: {
      query: SINGLE_ORDER_QUERY,
      variables: { id: fakeOrder.id }
    }
  },
  {
    result: {
      data: {
        order: fakeOrder()
      }
    }
  }
];

describe('<SingleOrderPage/>', () => {
  it('renders and matches snapshot', () => {
    const wrapper = mount(
      <MockedProvider>
        <SingleOrderPage query={fakeOrder()} />
      </MockedProvider>
    );
    expect(wrapper.find('p').text()).toBe('Loading...');
    expect(toJSON(wrapper.find('SingleOrderPage'))).toMatchSnapshot();
  });
});
