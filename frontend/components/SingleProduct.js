import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';

import DisplayError from './ErrorMessage';
import ItemStyles from './styles/ItemStyles';
import Title from './styles/Title';
import PriceTag from './styles/PriceTag';
import DeleteProduct from './DeleteProduct';
import AddToCart from './AddToCart';
import formatMoney from '../lib/formatMoney';

const ProductStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  max-width: var(--maxWidth);
  justify-content: center;
  align-items: top;
  gap: 2rem;
  img {
    width: 100%;
    object-fit: contain;
  }
`;

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      description
      price
      photo {
        altText
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const SingleProduct = ({ id }) => {
  const { data, error, loading } = useQuery(SINGLE_ITEM_QUERY, {
    variables: {
      id
    }
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;
  const { Product } = data;

  return (
    <ItemStyles>
      <img
        src={Product.photo.image.publicUrlTransformed}
        alt={Product.name}
      />
      <Title>
        <Link href={`/product/${Product.id}`}>
          {Product.name}
        </Link>
      </Title>
      <PriceTag>{formatMoney(Product.price)}</PriceTag>
      <p>{Product.description}</p>
      <div className="buttonList">
        <Link
          href={{
            pathname: 'update',
            query: { id: Product.id },
          }}
        >
          Edit ✏️
        </Link>
        <AddToCart id={Product.id} />
        <DeleteProduct id={Product.id}>Delete</DeleteProduct>
      </div>
    </ItemStyles>
  );
}

export default SingleProduct;
export { SINGLE_ITEM_QUERY };