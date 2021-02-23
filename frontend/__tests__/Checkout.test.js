import { configure, mount } from 'enzyme';
import Adapter from '@hteker/enzyme-adapter-react-17';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from '@apollo/client/testing';
import { ApolloConsumer } from '@apollo/client';
import { act } from 'react-dom/test-utils';
import wait from 'waait';

import Checkout, { CREATE_PRODUCT_MUTATION } from '../components/Checkout';
import { CURRENT_USER_QUERY } from '../components/User';
import { CartStateProvider } from '../lib/cartState';
import { fakeCartItem, fakeUser } from '../lib/testUtils';

configure({ adapter: new Adapter() });

const mocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: {
      me: {
        ...fakeUser(),
        cart: [fakeCartItem()]
      }
    }}
  }
]