import { configure, mount } from 'enzyme';
import Adapter from '@hteker/enzyme-adapter-react-17';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from '@apollo/client/testing';
import { act } from 'react-dom/test-utils';
import wait from 'waait';

import RemoveFromCart, { REMOVE_FROM_CART_MUTATION } from '../components/RemoveFromCart';
import { fakeCartItem } from '../lib/testUtils';

configure({ adapter: new Adapter() });

const mocks = [
  {
    request: {
      query: REMOVE_FROM_CART_MUTATION,
      variables: {
        id: fakeCartItem.id,
      }
    },
    result: {
      data: {
        id: fakeCartItem.id
      }
    }
  }
];

describe('<RemoveFromCart/>', () => {
  it('renders and matches snapshot', () => {
    const wrapper = mount(
      <MockedProvider>
        <RemoveFromCart />
      </MockedProvider>
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  it('removes item from cart', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RemoveFromCart id={fakeCartItem.id}/>
      </MockedProvider>
    );
    const button = wrapper.find('button');
    await act(async () => {
      
      // button.simulate('click');
      console.log(button.debug());
    });
  });
});
