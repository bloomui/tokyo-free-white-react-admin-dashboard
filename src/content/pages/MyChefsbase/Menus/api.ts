import { gql } from "@apollo/client";
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
import { menu, menuVariables } from "./types/menu";

const getMenuQuery = gql`
 query menu ($id: String!) {
   menu (id: $id) {
    id
    name
    rating
    season
    theme
    periodstartdate
    periodenddate
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

const AllDishQuery = gql`
 query AllDishes {
   dishes {
     id
     name
   }
 }
`;

const FilterMenuQuery = gql`
query FilterMenus ($input: MenuFilterInput, $offset: Int, $limit: Int) {
  numberOfMenus
  filterMenus (input: $input, offset: $offset, limit: $limit) {
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
mutation UpdateMenu ($input: MenuInput!, $courses: [AddCourseToDishesInput!]) {
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

export const menuRowsPerPage = 10;

export const useFilterMenuQuery = ({
  page,
  input,
}: {
  page: number;
  input: MenuFilterInput | null;
}) => {
  const offset = page * menuRowsPerPage
  const { loading, data, error } = useSimpleQuery<
  FilterMenus,
  FilterMenusVariables
  >(FilterMenuQuery, {
    variables: {
      input: input,
      offset: offset,
      limit: menuRowsPerPage,
    },
  });
  return { loading, data, error};
};

export const useGetMenuQuery = (id: string) => {

  const { loading, data, error } = useSimpleQuery<
  menu,
  menuVariables
  >(getMenuQuery, {
    variables: {
      id: id,
    },
  });
  return { loading, data, error};
};

export const useMenuQuery = ({
  productname
}: {
  productname: string
}) => {

  const { loading, data, error } = useSimpleQuery<
  Menus
  >(MenusData, {
    variables: {
      productname: productname
    }
  });
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