import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import PropTypes from 'prop-types';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $password: String!
    $token: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      password: $password
      token: $token
    ) {
      code
      message
    }
  }
`;

export default function Reset({ token }) {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    token: '',
  });
  const { email, password } = inputs;

  const [resetPassword, { data, error }] = useMutation(RESET_MUTATION, {
    variables: { email, password, token },
  });

  async function handleSubmit(e) {
    e.preventDefault();
    await resetPassword()
      .catch(console.error)
      .then(() => resetForm());
    resetForm();
  }

  const resetError = data?.redeemUserPasswordResetToken;

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <fieldset>
        <h2>Reset Password</h2>
        {data?.redeemUserPasswordResetToken === null && (
          <p>Password Changed!</p>
        )}
        <DisplayError error={error || resetError} />

        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            autoComplete="email"
            value={email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="password"
            value={password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Reset Password</button>
      </fieldset>
    </Form>
  );
}

Reset.propTypes = {
  token: PropTypes.string.isRequired,
};
