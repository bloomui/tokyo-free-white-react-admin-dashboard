/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: viewer
// ====================================================

export interface viewer_viewer {
  __typename: "Account";
  id: string | null;
  email: string | null;
  username: string | null;
  fullName: string | null;
  restaurantName: string | null;
  description: string | null;
  location: string | null;
}

export interface viewer {
  viewer: viewer_viewer | null;
}
