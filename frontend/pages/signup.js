import styled from 'styled-components';

import Signup from '../components/Signup';

const GridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 2rem;
`;

const SignUpPage = () => (
  <GridStyles>
    <Signup />
  </GridStyles>
);

export default SignUpPage;