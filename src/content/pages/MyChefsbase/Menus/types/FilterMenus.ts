/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MenuFilterInput } from "./../../../../../globalTypes";

// ====================================================
// GraphQL query operation: FilterMenus
// ====================================================

export interface FilterMenus_filterMenus {
  __typename: "NewMenu";
  id: string;
  periodenddate: string | null;
  periodstartdate: string | null;
  name: string;
  season: string | null;
  rating: number | null;
  theme: string | null;
}

export interface FilterMenus {
  numberOfMenus: number | null;
  filterMenus: FilterMenus_filterMenus[] | null;
}

export interface FilterMenusVariables {
  input?: MenuFilterInput | null;
  offset?: number | null;
  limit?: number | null;
}
