// import React from "react";
// import { ApolloProvider } from "@apollo/react-hooks";
// import ApolloClient, {
//   IntrospectionFragmentMatcher,
//   InMemoryCache,
// } from "apollo-boost";
// import config from "../config";
// import { getToken } from "./authentication/auth";

// const schema = require("../schema.json");

// const fragmentMatcher = new IntrospectionFragmentMatcher({
//   introspectionQueryResultData: schema,
// });

// const cache = new InMemoryCache({ fragmentMatcher });

// const client = new ApolloClient({
//   request: (operation) => {
//     const token = getToken();

//     operation.setContext({
//       uri: `${config.endpoint}?access_token=${token}`,
//     });
//   },
//   cache,
// });
export const Provider = {}
// : React.FC = ({ children }) => {
//   return <ApolloProvider client={client}>{children}</ApolloProvider>;
// };

export default Provider;