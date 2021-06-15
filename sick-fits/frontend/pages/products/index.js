import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import Products from '../../components/Products';
import Pagination from '../../components/Pagination';
import DisplayError from '../../components/ErrorMessage';
import { perPage } from '../../config';

export const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    _allProductsMeta {
      count
    }
  }
`;

export default function ProductPage() {
  const {
    query: { page },
  } = useRouter();
  let pageNumber = parseInt(page) || 1;

  const { error, loading, data } = useQuery(PAGINATION_QUERY);
  if (loading) return 'Loading...';
  if (error) return <DisplayError error={error} />;
  const { count } = data._allProductsMeta;
  const pageCount = Math.ceil(count / perPage);

  if (pageNumber > pageCount) {
    pageNumber = pageCount;
  }

  return (
    <div>
      <Pagination page={pageNumber} pageCount={pageCount} count={count} />
      <Products page={pageNumber} />
      count={count}
      <Pagination page={pageNumber} pageCount={pageCount} count={count} />
    </div>
  );
}

ProductPage.propTypes = {
  query: PropTypes.shape({
    page: PropTypes.string,
  }),
};
