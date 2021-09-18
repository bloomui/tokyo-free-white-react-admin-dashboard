

import React from "react";

export const ProtectedRoute = {}
// ({ children, ...rest }: RouteProps) => {
//     return (
//         <Route
//             {...rest}
//             render={({ location }) =>
//                 isLoggedIn() ? (
//                     children
//                 ) : (
//                         <Redirect
//                             to={{
//                                 pathname: "/login",
//                                 state: { from: location }
//                             }}
//                         />
//                     )
//             }
//         />
//     );
// }