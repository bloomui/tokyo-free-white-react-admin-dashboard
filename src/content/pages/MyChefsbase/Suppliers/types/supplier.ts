/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: supplier
// ====================================================

export interface supplier_supplier {
  __typename: "Supplier";
  id: string;
  name: string;
  rating: number | null;
  email: string;
}

export interface supplier {
  supplier: supplier_supplier | null;
}

export interface supplierVariables {
  id: string;
}
