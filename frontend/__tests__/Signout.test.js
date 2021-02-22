import { configure, mount, shallow } from 'enzyme';
import Adapter from '@hteker/enzyme-adapter-react-17';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from '@apollo/client/testing';
import { ApolloConsumer } from '@apollo/client';
import { act } from 'react-dom/test-utils';
import wait from 'waait';

import Signout, { SIGNOUT_MUTATION } from '../components/Signin';
import { CURRENT_USER_QUERY } from '../components/User';
import { fakeUser } from '../lib/testUtils';

configure({ adapter: new Adapter() });

const me = fakeUser();

const mocks = [
  {
    request: { query: SIGNOUT_MUTATION },
    result: {
      data: { me: null }
    }
  },
  {
    request: { query: CURRENT_USER_QUERY },
    result: { 
      data: { me }
    }
  }
]
describe('<Signout/>', () => {
  xit('renders and matches snapshot', async () => {
    let apolloClient;
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ApolloConsumer>
          {client => {
            apolloClient = client;
            return <Signout />;
          }}
        </ApolloConsumer>
      </MockedProvider>
    );
    const user = await apolloClient.query({ query: CURRENT_USER_QUERY });
    console.log(user);
  });
})
