import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';

import PaginationStyles from './styles/PaginationStyles';
import DisplayError from './ErrorMessage';
import { perPage } from '../config';

export const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    _allProductsMeta {
      count
    }
  }
`;

const Pagination = ({ page }) => {
  const { data, error, loading } = useQuery(PAGINATION_QUERY);
  if (error) return <DisplayError error={error} />;
  if (loading) return <p>Loading...</p>;
  const { count } = data._allProductsMeta;
  const pageCount = Math.ceil(count / perPage);

  return (
    <PaginationStyles>
      <Head>
        <title>Mask Up! - Page {page} of {pageCount}</title>
      </Head>
      <Link href={`/products/${page - 1}`}>
        <a aria-disabled={page <= 1}>
          ↩ Prev
        </a>
      </Link>
      <p>
        Page {page} of {pageCount}
      </p>
      <p>{count} Items Total</p>
      <Link href={`/products/${page + 1}`}>
        <a aria-disabled={page >= pageCount}>
          Next ↪ 
        </a>
      </Link>
    </PaginationStyles>
  );
}

export default Pagination;