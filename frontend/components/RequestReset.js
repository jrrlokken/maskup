import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';
import StyledButton from './styles/StyledButton';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

const RequestReset = () => {
  const { inputs, handleChange, clearForm } = useForm({ email: '' });
  const [signup, { data, error, loading }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: inputs,
    }
  );
  async function handleSubmit(event) {
    event.preventDefault();
    const res = await signup().catch(console.error);
    clearForm();
  }

  return (
    <Form
      method='post'
      onSubmit={handleSubmit}
    >
      <h2>Request password reset</h2>
      <DisplayError error={error} />
      <fieldset>
        {data?.sendUserPasswordResetLink === null && (
          <p>Success! Check your email for a reset link.</p>
        )}

        <label htmlFor='email'>
          Email
          <input
            type='email'
            name='email'
            placeholder='email'
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <StyledButton type='submit'>Request Reset</StyledButton>
      </fieldset>
    </Form>
  );
}

export default RequestReset;