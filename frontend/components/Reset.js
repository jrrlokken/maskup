import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';

import useForm from '../lib/useForm';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $token: String!
    $password: String!
    $email: String!
  ) {
    redeemUserPasswordResetToken(
      token: $token
      password: $password
      email: $email
    ) {
      code
      message
    }
  }
`;

const Reset = ({ token }) => {
  const { inputs, handleChange, resetForm } = useForm({
    password: '',
    email: '',
    token,
  });
  const [reset, { data, error, loading }] = useMutation(
    RESET_MUTATION, {
      variables: inputs,
  });
  const router = useRouter();
  const successfulError = data?.redeemUserPasswordResetToken?.code
    ? data?.redeemUserPasswordResetToken
    : undefined;
  async function handleSubmit(event) {
    event.preventDefault();
    await reset().catch(console.error);
    resetForm();
    router.push('/signin');
  }

  return (
    <Form
      method='POST'
      onSubmit={handleSubmit}
    >
      <h2>Reset your password</h2>
      <DisplayError error={error || successfulError} />
      <fieldset>
        {data?.redeemUserPasswordResetToken === null && (
          <p>Success! You can now sign in.</p>
        )}
        <label htmlFor='email'>
          Email address
          <input
            type='email'
            name='email'
            placeholder='Your Email Address'
            value={inputs.email}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor='password'>
          Password
          <input
            type='password'
            name='password'
            placeholder='Password'
            value={inputs.password}
            onChange={handleChange}
            required
          />
        </label>
        <button type='submit'>Reset</button>
      </fieldset>
    </Form>
  );
}

export default Reset;