/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MyChefsBase
// ====================================================

export interface MyChefsBase_suppliers {
  __typename: "Supplier";
  id: string;
  name: string;
  email: string;
  rating: number | null;
}

export interface MyChefsBase_products {
  __typename: "Product";
  id: string;
  name: string;
  rating: number | null;
  origin: string | null;
  brand: string | null;
}

export interface MyChefsBase_ingredients {
  __typename: "Ingredient";
  id: string;
  name: string;
  rating: number | null;
}

export interface MyChefsBase_recipes_method {
  __typename: "StepToMethod";
  step: number;
  method: string;
}

export interface MyChefsBase_recipes {
  __typename: "Recipe";
  id: string;
  name: string;
  rating: number | null;
  type: string | null;
  method: MyChefsBase_recipes_method[] | null;
}

export interface MyChefsBase_dishes_method {
  __typename: "StepToMethod";
  step: number;
  method: string;
}

export interface MyChefsBase_dishes {
  __typename: "Dish";
  id: string;
  name: string;
  type: string | null;
  theme: string | null;
  comment: string | null;
  method: MyChefsBase_dishes_method[] | null;
}

export interface MyChefsBase_menus_courses_course {
  __typename: "Course";
  id: string;
  courseType: string;
}

export interface MyChefsBase_menus_courses_dishes {
  __typename: "Dish";
  id: string;
  name: string;
}

export interface MyChefsBase_menus_courses {
  __typename: "CourseToDishes";
  course: MyChefsBase_menus_courses_course;
  dishes: MyChefsBase_menus_courses_dishes[];
}

export interface MyChefsBase_menus {
  __typename: "NewMenu";
  id: string;
  name: string;
  season: string | null;
  periodenddate: string | null;
  periodstartdate: string | null;
  theme: string | null;
  courses: MyChefsBase_menus_courses[] | null;
}

export interface MyChefsBase {
  suppliers: MyChefsBase_suppliers[] | null;
  products: MyChefsBase_products[] | null;
  ingredients: MyChefsBase_ingredients[] | null;
  recipes: MyChefsBase_recipes[] | null;
  dishes: MyChefsBase_dishes[] | null;
  menus: MyChefsBase_menus[] | null;
}
