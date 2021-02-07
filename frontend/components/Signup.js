import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';
import StyledButton from './styles/StyledButton';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    createUser(data: { email: $email, name: $name, password: $password }) {
      id
      email
      name
    }
  }
`;

const Signup = () => {
  const { inputs, handleChange, resetForm } = useForm({
    name: '',
    email: '',
    password: '',
  });
  const [signup, { data, error, loading }]= useMutation(SIGNUP_MUTATION, {
    variables: inputs,
    // refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  async function handleSubmit(event) {
    event.preventDefault();
    const res = await signup().catch(console.error);
    resetForm();
  }
  return (
    <Form method='post' onSubmit={handleSubmit}>
      <h2>Sign up for an account</h2>
      <DisplayError error={error} />
      <fieldset>
        {data?.createUser && (
          <p>Signed up with {data.createUser.email} - Please sign in</p>
        )}
        <label htmlFor='name'>
          Name
          <input
            type='text'
            name='name'
            placeholder='Your Name'
            autoComplete='name'
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
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
        <StyledButton type='submit'>Sign Up</StyledButton>
      </fieldset>
    </Form>
  );
}

export default Signup;