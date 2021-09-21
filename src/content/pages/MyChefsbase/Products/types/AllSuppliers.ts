/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AllSuppliers
// ====================================================

export interface AllSuppliers_suppliers {
  __typename: "Supplier";
  id: string;
  name: string;
}

export interface AllSuppliers {
  suppliers: AllSuppliers_suppliers[] | null;
}
