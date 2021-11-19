/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: suppliers
// ====================================================

export interface suppliers_suppliers {
  __typename: "Supplier";
  id: string;
  name: string;
  email: string;
  rating: number | null;
}

export interface suppliers {
  numberOfSuppliers: number | null;
  suppliers: suppliers_suppliers[] | null;
}

export interface suppliersVariables {
  name?: string | null;
  offset?: number | null;
  limit?: number | null;
}
