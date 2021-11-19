import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { useAuthToken } from "./token";
import { login, loginVariables } from "./types/login";
import { viewer } from "./types/viewer";

export const loginQuery = gql`
  query login ($email: String!, $password: String!) {
    login (email: $email, password: $password) {
        accessToken
    }
  }
`;

type Input = {
    onSuccess: (token: string | null) => void;
  };
  
  export const useLogin = (input: Input) => {
    const { onSuccess } = input;
  
    const [authenticateFn, { loading, data, error }] = useLazyQuery<
      login,
      loginVariables
    >(loginQuery, {
      onCompleted: result => {
           onSuccess(result.login?.accessToken)
    
      },
    });
  
    // const login = (email: string, password: string) => {
    //   authenticateFn({
    //     variables: {
    //       email,
    //       password,
    //     },
    //   });
    // };
  
    if (error) throw error

    return {
        authenticateFn,
      loading,
    };
  };

