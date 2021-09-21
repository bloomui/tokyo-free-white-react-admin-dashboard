import { gql } from "@apollo/client";
import { useRef } from "react";
import { useMutation } from "@apollo/client";
import { DishFilterInput, RecipeFilterInput } from "src/globalTypes";
import { useSimpleQuery } from "src/utilities/apollo";
import { AddRecipe, AddRecipeVariables } from "./types/AddRecipe";
import { AllIngredients } from "./types/AllIngredients";
import { FilterRecipes } from "./types/FilterRecipes";
import { recipe, recipeVariables } from "./types/recipe";
import { UpdateRecipe, UpdateRecipeVariables } from "./types/UpdateRecipe";

const getRecipeQuery = gql`
 query recipe ($id: String!) {
   recipe (id: $id) {
        id
        name
        rating
        type
        method {
          step
          method
        }
        ingredients {
          ingredient {
            id
            name
          }
          quantity {
            quantity
            unit
          }
        }
      }
    }`;

export const useGetRecipeQuery = (id: string) => {

    const { loading, data, error } = useSimpleQuery<
    recipe,
    recipeVariables
    >(getRecipeQuery, {
      variables: {
        id: id,
      },
    });
    return { loading, data, error};
  };

const AllIngredientsQuery = gql`
 query AllIngredients {
   ingredients {
     id
     name
   }
 }
`;

export const FilterRecipesQuery = gql`
query FilterRecipes ($input: RecipeFilterInput) {
    filterRecipes (input: $input) {
        id
        name
        rating
        type
        method {
          step
          method
        }
        ingredients {
          ingredient {
            id
            name
          }
          quantity {
            quantity
            unit
          }
        }
      }
    }`;

export const RecipesData = gql`
query Recipes {
  allThemes
  allTypes
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
  dishes {
    id
    name
  }
  menus {
    id
    name
  }
}
`;

export const UpdateRecipeMutation = gql`
mutation UpdateRecipe ($input: RecipeInput!, $ingredients: [QuantityToId!], $method: [StepToMethodInput!]) {
  updateRecipe (input: $input, ingredients: $ingredients, method: $method)
}
`;

export const AddRecipeMutation = gql`
mutation AddRecipe ($input: AddRecipeInput!, $ingredients: [QuantityToId!], $method: [StepToMethodInput!]) {
  addRecipe(input: $input, ingredients: $ingredients, method: $method)
}`;

export const useAllIngredientsQuery = () => {

    const { loading, data, error } = useSimpleQuery<
    AllIngredients
    >(AllIngredientsQuery);
    return { loading, data, error};
  };

export const useFilterRecipesQuery = ({
  input,
}: {
  input: RecipeFilterInput | null;
}) => {

  const { loading, data, error } = useSimpleQuery<
  FilterRecipes
    >(FilterRecipesQuery, {
    variables: {
      input: input,
    },
  });
  return { loading, data, error};
};

export const useUpdateRecipe = ({
  onCompleted,
}: {
  onCompleted: () => void;
}) => {
  const [updateRecipe, { loading, error }] = useMutation<
    UpdateRecipe,
    UpdateRecipeVariables
  >(UpdateRecipeMutation, {
    onCompleted: () => onCompleted(),
  });

  return {
    updateRecipe,
    loading,
    error,
  };
};

export const useAddRecipe = ({
  onCompleted,
}: {
  onCompleted: () => void;
}) => {
  const [addRecipe, { loading, error }] = useMutation<
    AddRecipe,
    AddRecipeVariables
  >(AddRecipeMutation, {
    onCompleted: () => onCompleted(),
  });

  return {
    addRecipe,
    loading,
    error,
  };
};