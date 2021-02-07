import UpdateProduct from '../components/UpdateProduct';

const UpdatePage = ({ query }) => (
  <div>
    <UpdateProduct id={query.id} />
  </div>
);

export default UpdatePage;