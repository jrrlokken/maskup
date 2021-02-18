import { configure, mount } from 'enzyme';
import Adapter from '@hteker/enzyme-adapter-react-17';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from '@apollo/client/testing';
import { act } from 'react-dom/test-utils';
import wait from 'waait';

import PleaseSignIn from '../components/PleaseSignIn';
import { CURRENT_USER_QUERY } from '../components/User';
import { fakeUser } from '../lib/testUtils';

configure({ adapter: new Adapter() });

const notSignedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { 
      data: {
        authenticatedItem: {
          user: null
        }
      }
    }
  },
];

const signedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { 
      data: { 
        authenticatedItem: {
          user: fakeUser() 
        } 
      }
    }
  },
];

describe('<PleaseSignIn/>', () => {
  it('renders the signin dialog when not logged in', () => {
    const wrapper = mount(
      <MockedProvider mocks={notSignedInMocks} addTypename={false}>
        <PleaseSignIn />
      </MockedProvider>
    );
    expect(wrapper.find('h2').text()).toBe('Sign into your account');
    expect(wrapper.find('Signin').exists()).toBe(true);
  });
// it('renders children to logged in users', async () => {
//     const Child = () => <p>I thought I was a child</p>;
//     const wrapper = mount(
//       <MockedProvider mocks={signedInMocks} addTypename={false}>
//         <PleaseSignIn>
//           <Child />
//         </PleaseSignIn>
//       </MockedProvider>
//     );
//     await act(async () => {
//       await wait();
//       wrapper.update();
//     });
//   });
});
