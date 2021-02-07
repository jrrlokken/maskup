import SingleProduct from '../../components/SingleProduct';

const SingleProductPage = ({ query }) => {
  return (
    <SingleProduct id={query.id} />
  );
}

export default SingleProductPage;