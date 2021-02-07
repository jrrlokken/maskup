import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';

import { ALL_PRODUCTS_QUERY } from './Products';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';
import StyledButton from './styles/StyledButton';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      name
      price
      description
    }
  }
`;

const CreateProduct = () => {
  const { inputs, handleChange, clearForm } = useForm({
    name: '',
    description: '',
    image: '',
    price: 0,
  });

  const [createProduct, { data, error, loading }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputs,
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    }
  );

  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();
    const res = await createProduct();
    console.log(res);
    clearForm();
    router.push(`/product/${res.data.createProduct.id}`);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor='image'>
          Image
          <input
            required
            type='file' 
            id='image' 
            name='image'
            onChange={handleChange}
          />
        </label>
        <label htmlFor='name'>
          Name
          <input
            required
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
            required
            id='description' 
            name='description' 
            placeholder='Description'
            value={inputs.description}
            onChange={handleChange}
          />
        </label>
        <label htmlFor='price'>
          Price
          <input
            required
            type='number' 
            id='price' 
            name='price' 
            placeholder='Price'
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <StyledButton type='submit'>+ Add Product</StyledButton>
      </fieldset>
    </Form>
  );
}

export default CreateProduct;