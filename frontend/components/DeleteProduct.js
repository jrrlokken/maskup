import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

const update = (cache, payload) => {
  cache.evict(cache.identify(payload.data.deleteProduct));
}

const DeleteProduct = ({ id, children }) => {
  const [deleteProduct, { error, loading }] = useMutation(DELETE_PRODUCT_MUTATION, {
    variables: { id },
    update,
  });
  const router = useRouter();

  const handleClick = () => {
    if (confirm('Are you sure?')) {
      deleteProduct()
        .catch(error => {
          alert(error.message);
        });
    }
    router.push('/products');
  }

  return (
    <button
      type='button'
      disabled={loading}
      onClick={handleClick}
    > 
      {children}
       🗑️
    </button>
  );
}

export default DeleteProduct;
export { DELETE_PRODUCT_MUTATION };
