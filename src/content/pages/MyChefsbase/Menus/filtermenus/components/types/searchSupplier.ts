/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: searchSupplier
// ====================================================

export interface searchSupplier_searchSupplier {
  __typename: "Supplier";
  id: string;
  name: string;
}

export interface searchSupplier {
  searchSupplier: (searchSupplier_searchSupplier | null)[] | null;
}

export interface searchSupplierVariables {
  suppliername?: string | null;
}
