import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import { CURRENT_USER_QUERY } from './User';
import DisplayError from './ErrorMessage';

const SIGN_IN_MUTATION = gql`
  mutation SIGN_IN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        sessionToken
        item {
          id
          name
          email
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        code
        message
      }
    }
  }
`;

export default function SignIn() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
  });
  const { email, password } = inputs;

  const [signIn, { data, error, loading }] = useMutation(SIGN_IN_MUTATION, {
    variables: { email, password },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const failedLogin =
    data?.authenticateUserWithPassword.__typename ===
    'UserAuthenticationWithPasswordFailure'
      ? data.authenticateUserWithPassword
      : undefined;

  async function handleSubmit(e) {
    e.preventDefault();
    await signIn();
    console.log(data);
    resetForm();
  }

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <fieldset>
        <h2>Sign in to your account</h2>
        <DisplayError error={failedLogin} />
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
        <button type="submit">Sign In!</button>
      </fieldset>
    </Form>
  );
}
