/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum KitchenType {
  Course = "Course",
  Dish = "Dish",
  Ingredient = "Ingredient",
  Menu = "Menu",
  Product = "Product",
  Recipe = "Recipe",
  Supplier = "Supplier",
}

export interface AddCourseToDishesInput {
  coursetype: string;
  dishes?: string[] | null;
}

export interface AddDishInput {
  name: string;
  rating?: number | null;
  type?: string | null;
  theme?: string | null;
  comment?: string | null;
}

export interface AddMenuInput {
  name: string;
  rating?: number | null;
  season?: string | null;
  theme?: string | null;
  periodstartdate?: string | null;
  periodenddate?: string | null;
}

export interface AddRecipeInput {
  name: string;
  rating?: number | null;
  type?: string | null;
}

export interface CourseToDishesInput {
  courseid: string;
  coursetype: string;
  dishes?: string[] | null;
}

export interface DishFilterInput {
  suppliers?: string[] | null;
  products?: string[] | null;
  ingredients?: string[] | null;
  recipes?: string[] | null;
  rating?: number | null;
  menus?: string[] | null;
  types?: string[] | null;
  themes?: string[] | null;
  comment?: string[] | null;
  course?: string[] | null;
  name?: string | null;
  offset?: number | null;
  limit?: number | null;
}

export interface DishInput {
  id: string;
  name: string;
  rating?: number | null;
  type?: string | null;
  theme?: string | null;
  comment?: string | null;
}

export interface MenuFilterInput {
  suppliers?: string[] | null;
  products?: string[] | null;
  ingredients?: string[] | null;
  recipes?: string[] | null;
  rating?: number | null;
  dishes?: string[] | null;
  type?: string[] | null;
  themes?: string[] | null;
  periodstartdate?: string | null;
  periodenddate?: string | null;
  seasons?: string[] | null;
  name?: string | null;
  offset?: number | null;
  limit?: number | null;
}

export interface MenuInput {
  id: string;
  name: string;
  rating?: number | null;
  season?: string | null;
  theme?: string | null;
  periodstartdate?: string | null;
  periodenddate?: string | null;
}

export interface QuantityToId {
  id: string;
  quantity: number;
  unit: string;
}

export interface RecipeFilterInput {
  suppliers?: string[] | null;
  products?: string[] | null;
  ingredients?: string[] | null;
  dishes?: string[] | null;
  rating?: number | null;
  menus?: string[] | null;
  types?: string[] | null;
  offset?: number | null;
  limit?: number | null;
  name?: string | null;
}

export interface RecipeInput {
  id: string;
  name: string;
  rating?: number | null;
  type?: string | null;
}

export interface StepToMethodInput {
  step: number;
  method: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
