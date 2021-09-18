/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MenuFilterInput } from "./../../../../../globalTypes";

// ====================================================
// GraphQL query operation: FilterMenus
// ====================================================

export interface FilterMenus_filterMenus_courses_course {
  __typename: "Course";
  id: string;
  courseType: string;
}

export interface FilterMenus_filterMenus_courses_dishes {
  __typename: "Dish";
  id: string;
  name: string;
}

export interface FilterMenus_filterMenus_courses {
  __typename: "CourseToDishes";
  course: FilterMenus_filterMenus_courses_course;
  dishes: FilterMenus_filterMenus_courses_dishes[];
}

export interface FilterMenus_filterMenus {
  __typename: "NewMenu";
  id: string;
  periodenddate: string | null;
  periodstartdate: string | null;
  name: string;
  season: string | null;
  rating: number | null;
  theme: string | null;
  courses: FilterMenus_filterMenus_courses[] | null;
}

export interface FilterMenus {
  filterMenus: FilterMenus_filterMenus[] | null;
}

export interface FilterMenusVariables {
  input?: MenuFilterInput | null;
}
