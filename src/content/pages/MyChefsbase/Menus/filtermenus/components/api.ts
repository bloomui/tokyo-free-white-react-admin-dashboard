import { gql } from "@apollo/client";
import { useSimpleQuery } from "src/utilities/apollo";
import { searchDish, searchDishVariables } from "./types/searchDish";
import { searchMenu, searchMenuVariables } from "./types/searchMenu";
import { searchRecipe, searchRecipeVariables } from "./types/searchRecipe";
import { searchSupplier, searchSupplierVariables } from "./types/searchSupplier";

export const searchRecipesQuery =  gql`
    query searchRecipe ($recipename: String) {
        searchRecipe (recipename: $recipename) {
            id
            name
        }
    }
`;

export const useSearchRecipeFilterQuery = ({
  name
}: {
  name: string
}) => {

  const { loading, data, error, refetch } = useSimpleQuery<
  searchRecipe, searchRecipeVariables
    >(searchRecipesQuery, {
    variables: {
      recipename: name
    },
  });
  return { loading, data, error, refetch};
};

export const searchMenusQuery =  gql`
    query searchMenu ($menuname: String) {
        searchMenu (menuname: $menuname) {
            id
            name
        }
    }
`;

export const useSearchMenuFilterQuery = ({
  name
}: {
  name: string
}) => {

  const { loading, data, error, refetch } = useSimpleQuery<
  searchMenu, searchMenuVariables
    >(searchMenusQuery, {
    variables: {
      menuname: name
    },
  });
  return { loading, data, error, refetch};
};

export const searchDishesQuery =  gql`
    query searchDish ($dishname: String) {
        searchDish (dishname: $dishname) {
            id
            name
        }
    }
`;

export const useSearchDishFilterQuery = ({
  name
}: {
  name: string
}) => {

  const { loading, data, error, refetch } = useSimpleQuery<
  searchDish, searchDishVariables
    >(searchDishesQuery, {
    variables: {
      dishname: name
    },
  });
  return { loading, data, error, refetch};
};

export const searchSuppliersQuery =  gql`
    query searchSupplier ($suppliername: String) {
        searchSupplier (suppliername: $suppliername) {
            id
            name
        }
    }
`;

export const useSearchSupplierFilterQuery = ({
  name
}: {
  name: string
}) => {

  const { loading, data, error, refetch } = useSimpleQuery<
  searchSupplier, searchSupplierVariables
    >(searchSuppliersQuery, {
    variables: {
      suppliername: name
    },
  });
  return { loading, data, error, refetch};
};