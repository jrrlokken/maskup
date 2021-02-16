import { configure, shallow, mount } from 'enzyme';
import Adapter from '@hteker/enzyme-adapter-react-17';
import { MockedProvider } from '@apollo/client/testing';
import wait from 'waait';
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
];

describe('<AddToCart/>', () => {
  it('renders and matches snapshotu', () => {
    const wrapper = shallow(
      <MockedProvider>
        <AddToCart />
      </MockedProvider>
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('updates button text when clicked', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AddToCart id={fakeProduct.id} />
      </MockedProvider>
    );
    const button = wrapper.find('button');
    expect(button.text()).toBe('Add To Cart 🛒');
    button.simulate('click');
    wrapper.update();
    expect(button.text()).toBe('Adding To Cart 🛒');
  });
});
