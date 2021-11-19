import { useRoutes } from 'react-router-dom';
import routes from './router';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';

import ThemeProvider from './theme/ThemeProvider';
import { CssBaseline } from '@material-ui/core';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import React from 'react';

import { setContext } from '@apollo/client/link/context';
import { getToken, isLoggedIn } from './utilities/auth';

const httpLink = createHttpLink({
  uri: 'http://localhost:9090/graphql/',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = getToken()
  console.log(token)
  // return the headers to the context so httpLink can read them
  return {
    uri: `http://localhost:9090/graphql/?access_token=${token}`,
  
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});


// const client = new ApolloClient({
//   uri: 'http://localhost:9090/graphql/?access_token=accesstoken',
//   cache: new InMemoryCache()
// });

const App = () => {

  const content = useRoutes(routes(isLoggedIn()));

  return (
    <ApolloProvider client={client}>
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        {content}
      </LocalizationProvider>
    </ThemeProvider>
    </ApolloProvider>
  );
}
export default App;
