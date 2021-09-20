/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: menu
// ====================================================

export interface menu_menu_courses_course {
  __typename: "Course";
  id: string;
  courseType: string;
}

export interface menu_menu_courses_dishes {
  __typename: "Dish";
  id: string;
  name: string;
}

export interface menu_menu_courses {
  __typename: "CourseToDishes";
  course: menu_menu_courses_course;
  dishes: menu_menu_courses_dishes[];
}

export interface menu_menu {
  __typename: "NewMenu";
  id: string;
  name: string;
  rating: number | null;
  season: string | null;
  theme: string | null;
  periodstartdate: string | null;
  periodenddate: string | null;
  courses: menu_menu_courses[] | null;
}

export interface menu {
  menu: menu_menu | null;
}

export interface menuVariables {
  id?: string | null;
}
