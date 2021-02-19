import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';

import Form from './styles/Form';
import DisplayError from './ErrorMessage';
import useForm from '../lib/useForm';

const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      description
      price
    }
  }
`;

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    updateProduct(
      id: $id
      data: {
        name: $name,
        description: $description,
        price: $price
      }
    ) {
      id
      name
      description
      price
    }
  }
`;

const UpdateProduct = ({ id }) => {
  const router = useRouter();
  const { data, error, loading } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id },
  });
  const [
    updateProduct,
    { data: updateData, error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_PRODUCT_MUTATION);
  const { inputs, handleChange } = useForm(
    data?.Product || { name: '', price: '', description: '' }
  );
  
  if (loading) return <p>Loading...</p>;

  return (
    <Form
      onSubmit={async event => {
        event.preventDefault();
        const res = await updateProduct({
          variables: {
            id,
            name: inputs.name,
            description: inputs.description,
            price: inputs.price,
          },
        }).catch(console.error);
        router.back();
      }}
    >

      <DisplayError error={error || updateError} />
      <fieldset disabled={updateLoading} aria-busy={updateLoading}>
        <label htmlFor='name'>
          Name
          <input
            type='text'
            id='name'
            name='name'
            placeholder='Name'
            value={inputs.name}
            onChange={handleChange}
          />
        </label>

        <label htmlFor='description'>
          Description
          <textarea
            id='description'
            name='description'
            placeholder='Enter a description'
            value={inputs.description}
            onChange={handleChange}
          />
        </label>

        <label htmlFor='price'>
          Price
          <input
            type='number'
            id='price'
            name='price'
            placeholder='Price'
            value={inputs.price}
            onChange={handleChange}
          />
        </label>

        <button type='submit'>Update Product</button>
      </fieldset>
    </Form>
  );
}

export default UpdateProduct;
export { UPDATE_PRODUCT_MUTATION };
