/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MenuFilterInput } from "./../../../../../globalTypes";

// ====================================================
// GraphQL query operation: Menus
// ====================================================

export interface Menus_filterMenus_courses_course {
  __typename: "Course";
  id: string;
  courseType: string;
}

export interface Menus_filterMenus_courses_dishes {
  __typename: "Dish";
  id: string;
  name: string;
}

export interface Menus_filterMenus_courses {
  __typename: "CourseToDishes";
  course: Menus_filterMenus_courses_course;
  dishes: Menus_filterMenus_courses_dishes[];
}

export interface Menus_filterMenus {
  __typename: "NewMenu";
  id: string;
  periodenddate: string | null;
  periodstartdate: string | null;
  name: string;
  season: string | null;
  rating: number | null;
  theme: string | null;
  courses: Menus_filterMenus_courses[] | null;
}

export interface Menus_suppliers {
  __typename: "Supplier";
  id: string;
  name: string;
}

export interface Menus_products {
  __typename: "Product";
  id: string;
  name: string;
}

export interface Menus_ingredients {
  __typename: "Ingredient";
  id: string;
  name: string;
}

export interface Menus_recipes {
  __typename: "Recipe";
  id: string;
  name: string;
}

export interface Menus_dishes {
  __typename: "Dish";
  id: string;
  name: string;
}

export interface Menus {
  allSeasons: string[] | null;
  allThemes: string[] | null;
  filterMenus: Menus_filterMenus[] | null;
  suppliers: Menus_suppliers[] | null;
  products: Menus_products[] | null;
  ingredients: Menus_ingredients[] | null;
  recipes: Menus_recipes[] | null;
  dishes: Menus_dishes[] | null;
}

export interface MenusVariables {
  input?: MenuFilterInput | null;
}
