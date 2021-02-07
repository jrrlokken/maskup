import styled from 'styled-components';

const StyledButton = styled.button`
  background: var(--blue);
  color: white;
  font-weight: 500;
  border: 0;
  border-radius: 5%;
  text-transform: uppercase;
  font-size: 2.5rem;
  padding: 0.8rem 1.5rem;
  display: inline-block;
  transition: all 0.5s;
  &[disabled] {
    opacity: 0.5;
  }
  &:hover {
    cursor: pointer;

  }
`;

export default StyledButton;
