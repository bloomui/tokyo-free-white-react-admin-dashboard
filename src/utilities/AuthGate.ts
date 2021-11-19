import React from "react";
import { useAuthToken } from "./token";

// export const AuthGate = () => {

//   // using our authToken. Can be undefined
//   const [authToken] = useAuthToken()
  
//   // trying to fetch our user data. Will fail if authToken is undefined
//   const userData = useViewerQuery();

//   // if both are loaded, we serve our app
//   if (userData.viewer && authToken) {
//     return <Private user={userData.accesstoken} />;
//   }
//   // otherwise, we display the login form
//   return <AuthenticationForm loading={userData.loading} />;
// };