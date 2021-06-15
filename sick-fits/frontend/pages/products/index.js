import PropTypes from 'prop-types';
import Products from '../../components/Products';
import Pagination from '../../components/Pagination';

export default function ProductPage({ query: { page } }) {
  const pageNumber = parseInt(page) || 1;
  console.log(pageNumber);
  return (
    <div>
      <Pagination page={pageNumber} />
      <Products page={pageNumber} />
      <Pagination page={pageNumber} />
    </div>
  );
}

ProductPage.propTypes = {
  query: PropTypes.shape({
    page: PropTypes.string,
  }),
};
