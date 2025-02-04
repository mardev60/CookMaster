import { ApolloClient, InMemoryCache, HttpLink, ApolloProvider } from '@apollo/client';

const httpLink = new HttpLink({
  uri: 'http://localhost:3000/graphql',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export { client, ApolloProvider };