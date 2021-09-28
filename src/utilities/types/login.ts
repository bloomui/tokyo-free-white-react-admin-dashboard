/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: login
// ====================================================

export interface login_login {
  __typename: "LoginResult";
  /**
   *  If non null then username/password correct. Otherwise null
   */
  accessToken: string | null;
}

export interface login {
  login: login_login | null;
}

export interface loginVariables {
  email: string;
  password: string;
}
