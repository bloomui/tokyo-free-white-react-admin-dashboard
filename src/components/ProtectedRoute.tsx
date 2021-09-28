

import React from "react";

import { Route, useNavigate } from "react-router";
import { isLoggedIn } from "src/utilities/auth";

function ProtectedRoute({ Component, ...rest }: any) {
    const navigate = useNavigate();
    
    return (
      <Route
        {...rest}
        render={props =>
          isLoggedIn() ? (
            <Component {...props} />
          ) : (
            navigate(`${props.location}`)
          )
        }
      />
    );
  }
  
  export default ProtectedRoute;