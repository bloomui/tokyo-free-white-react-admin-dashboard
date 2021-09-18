import { gql } from "@apollo/client";
import { useRef } from "react";
import { useMutation } from "@apollo/client";
import { Menus } from "./types/Menus";
import { Delete, DeleteVariables } from "./types/Delete";
import { addToFavorites, addToFavoritesVariables } from "./types/addToFavorites";
import { UpdateMenu, UpdateMenuVariables } from "./types/UpdateMenu";
import { AddMenu, AddMenuVariables } from "./types/AddMenu";
import { MenuFilterInput } from "src/globalTypes";
import { useSimpleQuery } from "src/utilities/apollo";
import { DeleteMultiple, DeleteMultipleVariables } from "./types/DeleteMultiple";
import { addToFavoritesMultiple, addToFavoritesMultipleVariables } from "./types/addToFavoritesMultiple";
import { FilterMenus, FilterMenusVariables } from "./types/FilterMenus";
import { AllDishes } from "./types/AllDishes";

const AllDishQuery = gql`
 query AllDishes {
   dishes {
     id
     name
   }
 }
`;

const FilterMenuQuery = gql`
query FilterMenus ($input: MenuFilterInput) {
  filterMenus (input: $input) {
    id
    periodenddate
    periodstartdate
    name
    season
    rating
    theme
    courses {
      course {
        id
        courseType
      }
      dishes {
        id
        name
      }
    }
  }
}
`;

export const MenusData = gql`
query Menus {
  allSeasons
  allThemes
  suppliers {
    id
    name
  }
  products {
    id
    name
  }
  ingredients {
    id
    name
  }
  recipes {
    id
    name
  }
  dishes {
    id
    name
  }
}
`;

export const UpdateMenuMutation = gql`
mutation UpdateMenu ($input: MenuInput!, $courses: [CourseToDishesInput!]) {
  updateMenu (input: $input, courses: $courses)
}
`;

export const DeleteMenuMutation = gql`
mutation Delete ($id: String!, $kitchenType: KitchenType!) {
  delete (id: $id, kitchenType: $kitchenType)
}
`;

export const DeleteMultipleMutation = gql`
mutation DeleteMultiple ($ids: [String!]!, $kitchenType: KitchenType!) {
  deleteMultiple (ids: $ids, kitchenType: $kitchenType)
}
`;

export const AddtoFavoritesMultipleMutation = gql`
mutation addToFavoritesMultiple ($ids: [String!]!, $kitchenType: KitchenType!) {
  addToFavoritesMultiple (ids: $ids, kitchenType: $kitchenType)
}
`;

export const AddtoFavoritesMutation = gql`
mutation addToFavorites ($id: String!, $kitchenType: KitchenType!) {
  addToFavorites (id: $id, kitchenType: $kitchenType)
}
`;

export const AddMenuMutation = gql`
mutation AddMenu ($input: AddMenuInput!, $courses: [AddCourseToDishesInput!]) {
  addMenu(input: $input, courses: $courses)
}`;

export const useFilterMenuQuery = ({
  input,
}: {
  input: MenuFilterInput | null;
}) => {

  const { loading, data, error } = useSimpleQuery<
  FilterMenus,
  FilterMenusVariables
  >(FilterMenuQuery, {
    variables: {
      input: input,
    },
  });
  return { loading, data, error};
};

export const useMenuQuery = () => {

  const { loading, data, error } = useSimpleQuery<
  Menus
  >(MenusData);
  return { loading, data, error};
};

export const useAllDishesQuery = () => {

  const { loading, data, error } = useSimpleQuery<
  AllDishes
  >(AllDishQuery);
  return { loading, data, error};
};

export const useUpdateMenu = ({
  onCompleted,
}: {
  onCompleted: () => void;
}) => {
  const [updateMenu, { loading, error }] = useMutation<
    UpdateMenu,
    UpdateMenuVariables
  >(UpdateMenuMutation, {
    onCompleted: () => onCompleted(),
  });

  return {
    updateMenu,
    loading,
    error,
  };
};

export const useDelete = ({
  onCompleted
}: {
  onCompleted: () => void;
}) => {
  const [remove, { loading, error }] = useMutation<
    Delete,
    DeleteVariables
  >(DeleteMenuMutation, {
    onCompleted: () => onCompleted(),
  });

  return {
    remove,
    loading,
    error,
  };
};

export const useDeleteMultiple = ({
  onCompleted
}: {
  onCompleted: () => void;
}) => {
  const [removeMultiple, { loading, error }] = useMutation<
    DeleteMultiple,
    DeleteMultipleVariables
  >(DeleteMultipleMutation, {
    onCompleted: () => onCompleted(),
  });

  return {
    removeMultiple,
    loading,
    error,
  };
};

export const useAddToFavoritesMultiple = ({
  onCompleted
}: {
  onCompleted: () => void;
}) => {
  const [addMultiple, { loading, error }] = useMutation<
    addToFavoritesMultiple,
    addToFavoritesMultipleVariables
  >(AddtoFavoritesMultipleMutation, {
    onCompleted: () => onCompleted(),
  });

  return {
    addMultiple,
    loading,
    error,
  };
};

export const useAddToFavorites = ({
  onCompleted
}: {
  onCompleted: () => void;
}) => {
  const [add, { loading, error }] = useMutation<
    addToFavorites,
    addToFavoritesVariables
  >(AddtoFavoritesMutation, {
    onCompleted: () => onCompleted(),
  });

  return {
    add,
    loading,
    error,
  };
};

export const useAddMenu = ({
  onCompleted,
}: {
  onCompleted: () => void;
}) => {
  const [addMenu, { loading, error }] = useMutation<
    AddMenu,
    AddMenuVariables
  >(AddMenuMutation, {
    onCompleted: () => onCompleted(),
  });

  return {
    addMenu,
    loading,
    error,
  };
};