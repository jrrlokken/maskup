import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

const Badge = styled.div`
  background-color: var(--black);
  color: white;
  border-radius: 50%;
  padding: 0.5rem;
  line-height: 2rem;
  min-width: 3rem;
  margin-left: 1rem;
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
`;

const AnimationStyles = styled.span`
  position: relative;
  .count {
    display: block;
    position: relative;
    transition: all 0.4s;
    backface-visibility: hidden;
  }
  .count-enter {
    transform: scale(2) rotateX(0.5turn);
  }
  .count-enter-active {
    transform: rotateX(0);
  }
  .count-exit {
    top: 0;
    position: absolute;
    transform: rotateX(0);
  }
  .count-exit {
    transform: scale(2) rotateX(0.5turn);
  }
`;

const CartCount = ({ count }) => (
  <AnimationStyles>
   <TransitionGroup>
     <CSSTransition
      className='count'
      classNames='count'
      key={count}
      timeout={{ enter: 400, exit: 400}}
      unmountOnExit
      >
      <Badge>{count}</Badge>
     </CSSTransition>
   </TransitionGroup>
  </AnimationStyles>
);

export default CartCount;