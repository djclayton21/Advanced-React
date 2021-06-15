import PropTypes from 'prop-types';
import Products from '../../components/Products';
import Pagination from '../../components/Pagination';

export default function ProductPage({ query: { page = '1' } }) {
  const pageNumber = parseInt(page);
  return (
    <div>
      <Pagination page={pageNumber} />
      <Products />
      <Pagination page={pageNumber} />
    </div>
  );
}

ProductPage.propTypes = {
  query: PropTypes.shape({
    page: PropTypes.string,
  }),
};
