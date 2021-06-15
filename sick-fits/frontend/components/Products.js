import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Product from './Product';
import DisplayError from './ErrorMessage';
import { perPage } from '../config';

export const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY($skip: Int = 0, $first: Int) {
    allProducts(first: $first, skip: $skip) {
      id
      name
      price
      description
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;
const ProductsListStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

export default function Products({ page }) {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY, {
    variables: { skip: (page - 1) * perPage, first: perPage },
  });
  if (loading) return <p>Loading!</p>;
  if (error) return <DisplayError error={error} />;
  return (
    <div>
      <ProductsListStyled>
        {data.allProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </ProductsListStyled>
    </div>
  );
}

Products.propTypes = {
  page: PropTypes.number,
};
