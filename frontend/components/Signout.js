import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import { CURRENT_USER_QUERY } from './User';

const SIGNOUT_MUTATION = gql`
  mutation SIGNOUT_MUTATION {
    endSession
  }
`;

const Signout = () => {
  const [signout] = useMutation(SIGNOUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  return (
    <button type='button' onClick={signout}>
      Sign Out
    </button>
  );
}

export default Signout;