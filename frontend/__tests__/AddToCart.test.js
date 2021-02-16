import { configure, shallow, mount } from 'enzyme';
import Adapter from '@hteker/enzyme-adapter-react-17';
import MockedProvider from '@apollo/client/testing';
import AddToCart, { ADD_TO_CART_MUTATION } from '../components/AddToCart';
import { fakeProduct, fakeUser } from '../lib/testUtils';

configure({ adapter: new Adapter() });

const mocks = [
  {
    request: { 
      query: ADD_TO_CART_MUTATION,
      variables: { id: fakeProduct.id }
    },
    result: {
      data: {
        product: { connect: { id: fakeProduct.id} },
        user: { connect: { id: fakeUser.id } }
      }
    }
  },
]

describe('<AddToCart/>', () => {
  xit('renders without crashing', () => {
    const wrapper = mount(
      <MockedProvider>
        <AddToCart id={fakeProduct.id} />);
      </MockedProvider>
    );
    console.log(wrapper.debug());
  })
})
