import { onError } from 'apollo-link-error';
export const ErrorLink = onError(({ graphQLErrors, networkError, forward }) => {
  let errorMessage = '';
  if (graphQLErrors) {
    console.log(graphQLErrors);
    graphQLErrors.map(({ message, locations, path }) => {
      console.error({ message, locations, path });
      errorMessage = `${message}`;
    });
  }

  if (networkError) {
    const netErr = networkError as any;
    if (netErr.error && netErr.error.errors) {
      console.error(`[Network error]:`, netErr.error.errors[0].message);
      errorMessage = `[Network error]: ${netErr.error.errors[0].message}`;
      networkError.message = netErr.error.errors[0].message;
    } else {
      errorMessage = `[Network error]: ${networkError}`;
    }
  }
});
