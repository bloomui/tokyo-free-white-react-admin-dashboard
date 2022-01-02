import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useAuthToken } from "./token";
import { login, loginVariables } from "./types/login";
import { signup, signupVariables } from "./types/signup";
import { updateAccount, updateAccountVariables } from "./types/updateAccount";
import { viewer } from "./types/viewer";

export const loginQuery = gql`
  query login ($email: String!, $password: String!) {
    login (email: $email, password: $password) {
        accessToken
    }
  }
`;

export const signUpMutation =gql`
mutation signup ($email: String!, $password: String!, $description: String, $location: String, $fullName: String, $restaurantName: String) {
  signup (email: $email, password: $password, description: $description, location: $location,  fullName: $fullName, restaurantName: $restaurantName) 
}`;

export const updateAccountMutation =gql`
mutation updateAccount ($email: String!, $password: String!, $description: String, $location: String, $fullName: String, $restaurantName: String) {
  updateAccount (email: $email, password: $password, description: $description, location: $location,  fullName: $fullName, restaurantName: $restaurantName) 
}`;

export const useSignUp = ({
  onCompleted,
}: {
  onCompleted: () => void;
}) => {
  const [signUp, { loading, error }] = useMutation<
  signup,
  signupVariables
  >(signUpMutation, {
    onCompleted: () => onCompleted(),
  });

  return {
    signUp,
    loading,
    error,
  };
};

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
  
    if (error) throw error

    return {
        authenticateFn,
      loading,
    };
  };

  export const useUpdateAccount = ({
    onCompleted,
  }: {
    onCompleted: () => void;
  }) => {
    const [updateAccount, { loading, error }] = useMutation<
      updateAccount,
      updateAccountVariables
    >(updateAccountMutation, {
      onCompleted: () => onCompleted(),
    });
  
    return {
      updateAccount,
      loading,
      error,
    };
  };