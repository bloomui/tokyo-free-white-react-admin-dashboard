import { gql } from "@apollo/client";
import { useRef } from "react";
import { useMutation } from "@apollo/client";
import { Menus, MenusVariables } from "./types/Menus";
import { Delete, DeleteVariables } from "./types/Delete";
import { addToFavorites, addToFavoritesVariables } from "./types/addToFavorites";
import { UpdateMenu, UpdateMenuVariables } from "./types/UpdateMenu";
import { AddMenu, AddMenuVariables } from "./types/AddMenu";
import { MenuFilterInput } from "src/globalTypes";
import { useSimpleQuery } from "src/utilities/apollo";

const MenusData = gql`
query Menus ($input: MenuFilterInput) {
  allSeasons
  allThemes
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

export const AddtoFavoritesMutation = gql`
mutation addToFavorites ($id: String!, $kitchenType: KitchenType!) {
  addToFavorites (id: $id, kitchenType: $kitchenType)
}
`;

export const AddMenuMutation = gql`
mutation AddMenu ($input: AddMenuInput!, $courses: [AddCourseToDishesInput!]) {
  addMenu(input: $input, courses: $courses)
}`;

export const useMenuQuery = ({
  input,
}: {
  input: MenuFilterInput | null;
}) => {

  const { loading, data, error } = useSimpleQuery<
  Menus,
  MenusVariables
  >(MenusData, {
    variables: {
      input: input,
    },
  });
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