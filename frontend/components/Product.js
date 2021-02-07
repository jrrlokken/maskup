import Link from 'next/link';

import Title from './styles/Title';
import ItemStyles from './styles/ItemStyles';
import PriceTag from './styles/PriceTag';
import DeleteProduct from './DeleteProduct';
import AddToCart from './AddToCart';
import formatMoney from '../lib/formatMoney';

const Product = ({ product }) => {
  return (
    <ItemStyles>
      <img
        src={product.photo.image.publicUrlTransformed}
        alt={product.name}
      />
      <Title>
        <Link href={`/product/${product.id}`}>
          {product.name}
        </Link>
      </Title>
      <PriceTag>{formatMoney(product.price)}</PriceTag>
      <p>{product.description}</p>
      <div className="buttonList">
        <Link
          href={{
            pathname: 'update',
            query: { id: product.id },
          }}
        >
          Edit ✏️
        </Link>
        <AddToCart id={product.id} />
        <DeleteProduct id={product.id}>Delete</DeleteProduct>
      </div>
    </ItemStyles>
  );
}

export default Product;