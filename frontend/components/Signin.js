import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';

import { CURRENT_USER_QUERY } from './User';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';
import StyledButton from './styles/StyledButton';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          email
          name
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        code
        message
      }
    }
  }
`;

const Signin = () => {
  const router = useRouter();
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
  });
  const [signin, { data }] = useMutation(SIGNIN_MUTATION, {
    variables: inputs,
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  async function handleSubmit(event) {
    event.preventDefault();
    await signin();
    resetForm();
    router.push('/products');
  }
  const error = data?.authenticateUserWithPassword.__typename === 'UserAuthenticationWithPasswordFailure'
    ? data?.authenticateUserWithPassword
    : undefined;

  return (
    <Form
      method='post'
      onSubmit={handleSubmit}
    >
      <h2>Sign into your account</h2>
      <DisplayError error={error} />
      <fieldset>
        <label htmlFor='email'>
          Email
          <input
            type='email'
            name='email'
            placeholder='Your Email Address'
            autoComplete='email'
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor='password'>
          Password
          <input
            type='password'
            name='password'
            placeholder='Password'
            autoComplete='password'
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
      </fieldset>
      <StyledButton type='submit'>Sign In</StyledButton>
    </Form>
  );
}

export default Signin;
export { SIGNIN_MUTATION };