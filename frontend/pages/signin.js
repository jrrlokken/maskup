import styled from 'styled-components';

import Signin from '../components/Signin';
import RequestReset from '../components/RequestReset';

const GridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 2rem;
`;

const SignInPage = () => (
  <GridStyles>
    <Signin />
    <RequestReset />
  </GridStyles>
);

export default SignInPage;