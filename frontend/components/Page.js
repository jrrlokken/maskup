import styled, { createGlobalStyle } from 'styled-components';
import Header from './Header';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Maven Pro';
    src: url(https://fonts.gstatic.com/s/mavenpro/v22/7Au9p_AqnyWWAxW2Wk3GzWQI.woff2) format('woff2');
    font-weight: 400;
    font-style: normal;
  }
  html {
    --blue: #34c8ff;
    --black: #393939;
    --grey: #3A3A3A;
    --gray: var(--grey);
    --lightGrey: #e1e1e1;
    --lightGray: var(--lightGrey);
    --offWhite: #ededed;
    --purple: #ce42f5;
    --maxWidth: 1000px;
    --bs: 0 12px 24px 0 rgba(0,0,0,0.09);
    box-sizing: border-box;
    font-size: 10px;
    h1 {
      font-weight: 900;
    }
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    font-family: 'Maven Pro';
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height:2;
  }
  a {
    text-decoration: none;
    color: var(--black);
  }
  button {
    font-family: 'Maven Pro';
    cursor: pointer;
  }
`;

const InnerStyles = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

const Page = ({ children }) => {
  return (
    <div>
      <Header />
      <GlobalStyles />
      <InnerStyles>{children}</InnerStyles>
    </div>
  );
}

export default Page;