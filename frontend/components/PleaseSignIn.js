import { useUser } from './User';
import Signin from './Signin';

const PleaseSignIn = ({ children }) => {
  const user = useUser();
  if (!user) return <Signin />;
  return children;
}

export default PleaseSignIn;