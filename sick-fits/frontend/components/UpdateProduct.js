import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';
import useForm from '../lib/useForm';

const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      name
      id
      description
      price
    }
  }
`;

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $price: Int
    $description: String
  ) {
    updateProduct(
      data: { name: $name, price: $price, description: $description }
      id: $id
    ) {
      name
      description
      price
    }
  }
`;

export default function UpdateProduct({ id }) {
  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id },
  });
  const [
    updateProduct,
    { error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_PRODUCT_MUTATION);
  const loading = queryLoading || updateLoading;
  const error = queryError || updateError;

  const { inputs, handleChange, setInputs } = useForm(queryData?.Product);

  async function handleSubmit(e) {
    e.preventDefault();
    const { name, price, description } = inputs;
    const res = await updateProduct({
      variables: { id, name, price, description },
    });
    console.log(res);
  }

  useEffect(() => {
    setInputs(queryData.Product);
  }, [queryData, setInputs]);

  if (loading) return <p>Loading!</p>;
  return (
    <Form onSubmit={handleSubmit}>
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          price
          <input
            type="number"
            id="price"
            name="price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          description
          <textarea
            type="textarea"
            id="description"
            name="description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>
      </fieldset>
      <button type="submit">Update Product</button>
    </Form>
  );
}

UpdateProduct.propTypes = {
  id: PropTypes.string.isRequired,
};
