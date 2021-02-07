import Link from 'next/link';
import styled from 'styled-components';

import Cart from './Cart';
import Nav from './Nav';
import Search from './Search';

const Logo = styled.h1`
  font-size: 4rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  /* background-color: var(--blue); */
  a {
    color: white;
    text-decoration: none;
    text-transform: uppercase;
    padding: 0.5rem 1rem;
  }
  @media (max-width: 1300px) {
    margin: 2rem;
    text-align: center;
  }
`;

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: var(--blue);
  .bar {
    border-bottom: 10px solid var(--black);
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
    @media (max-width: 1300px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }
  
  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid var(--black);
  }
`;

const Header = () => (
  <StyledHeader>
    <div className="bar">
      <Logo><Link href='/'><a id='logo'>Mask Up!</a></Link></Logo>
      <Nav />
    </div>
    <div className="sub-bar">
      <Search />
    </div>
    <Cart />
  </StyledHeader>
);

export default Header;