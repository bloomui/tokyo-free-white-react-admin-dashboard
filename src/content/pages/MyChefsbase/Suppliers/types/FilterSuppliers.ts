/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SupplierFilterInput } from "./../../../../../globalTypes";

// ====================================================
// GraphQL query operation: FilterSuppliers
// ====================================================

export interface FilterSuppliers_filterSuppliers {
  __typename: "Supplier";
  id: string;
  name: string;
  rating: number | null;
  email: string;
}

export interface FilterSuppliers {
  numberOfSuppliers: number | null;
  filterSuppliers: FilterSuppliers_filterSuppliers[] | null;
}

export interface FilterSuppliersVariables {
  input?: SupplierFilterInput | null;
  offset?: number | null;
  limit?: number | null;
}
