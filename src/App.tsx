import { useRoutes } from 'react-router-dom';
import routes from './router';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';

import ThemeProvider from './theme/ThemeProvider';
import { CssBaseline } from '@material-ui/core';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import React from 'react';

const client = new ApolloClient({
  uri: 'http://localhost:9090/graphql/?access_token=accesstoken',
  cache: new InMemoryCache()
});

const App = () => {

  const content = useRoutes(routes);

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
