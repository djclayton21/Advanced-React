import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';

import styled from 'styled-components';

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      name
      id
    }
  }
`;
function handleUpdate(cache, payload) {
  cache.evict(cache.identify(payload.data.deleteProduct));
}

export default function DeleteProduct({ id, children }) {
  const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT_MUTATION, {
    variables: { id },
    update: handleUpdate,
  });
  return (
    <button
      type="button"
      disabled={loading}
      onClick={() => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Are you sure you want to delete this item?')) {
          deleteProduct().catch((err) => err.message);
        }
      }}
    >
      {children}
    </button>
  );
}

DeleteProduct.propTypes = {
  children: PropTypes.any,
  id: PropTypes.string.isRequired,
};
