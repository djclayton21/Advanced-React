import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

export default function RequestReset() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
  });
  const { email } = inputs;

  const [requestReset, { data, error }] = useMutation(REQUEST_RESET_MUTATION, {
    variables: { email },
  });

  async function handleSubmit(e) {
    e.preventDefault();
    await requestReset()
      .catch(console.error)
      .then(() => resetForm());
    resetForm();
  }

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <fieldset>
        <h2>Request Password Reset</h2>
        {data?.sendUserPasswordResetLink === null && (
          <p>Check your email for a link!</p>
        )}
        <DisplayError error={error} />

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

        <button type="submit">Reset Password</button>
      </fieldset>
    </Form>
  );
}
