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
import { NutritionForRecipe, NutritionForRecipeVariables } from "./types/NutritionForRecipe";
import { ingredientsForRecipe, ingredientsForRecipeVariables } from "./types/ingredientsForRecipe";

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
query FilterRecipes ($input: RecipeFilterInput, $offset: Int, $limit: Int) {
  numberOfRecipes  
  filterRecipes (input: $input, offset: $offset, limit: $limit) {
        id
        name
        rating
        type
        method {
          step
          method
        }
      }
    }`;

export const RecipesData = gql`
query Recipes {
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

export const IngredientsForRecipeQuery = gql`
query ingredientsForRecipe ($id: String!, $quantity: Float!, $unit: String!) {
  ingredientsForRecipe (id: $id, quantity: $quantity, unit: $unit) { 
    quantity {
      quantity
      unit
    }
    ingredient {
      id
    	name
    }
  }
}
    `;
export const NutritionForRecipeQuery = gql`
query NutritionForRecipe ($id: String!, $quantity: Float!, $unit: String!) {
  nutritionForRecipe (id: $id, quantity: $quantity, unit: $unit) {
      vitamins {
      c
        e
        dTotal
        kTotal
    }
      carbs {
        carbs
        sugar
      }
      protein {
        total
      }
      fat {
        total
      }
      kcal
    }
  }`;


export const UpdateRecipeMutation = gql`
mutation UpdateRecipe ($input: RecipeInput!, $ingredients: [QuantityToId!], $method: [StepToMethodInput!]) {
  updateRecipe (input: $input, ingredients: $ingredients, method: $method)
}
`;

export const AddRecipeMutation = gql`
mutation AddRecipe ($input: AddRecipeInput!, $ingredients: [QuantityToId!], $method: [StepToMethodInput!]) {
  addRecipe(input: $input, ingredients: $ingredients, method: $method)
}`;

export const useGetNutritionForRecipe = ({
  id,
  quantity,
  unit
}: {
  id: string,
  quantity: number,
  unit: string
}) => {
  const { loading, data, error, refetch } = useSimpleQuery<
  NutritionForRecipe,
  NutritionForRecipeVariables
  >(NutritionForRecipeQuery, {
    variables: {
      id: id,
      quantity: quantity,
      unit: unit
    },
  });
  return { loading, data, error, refetch};
};

export const useGetIngredientsForRecipe = ({
  id,
  quantity,
  unit
}: {
  id: string,
  quantity: number,
  unit: string
}) => {
  const { loading, data, error, refetch } = useSimpleQuery<
  ingredientsForRecipe,
  ingredientsForRecipeVariables
  >(IngredientsForRecipeQuery, {
    variables: {
      id: id,
      quantity: quantity,
      unit: unit
    },
  });
  return { loading, data, error, refetch};
};

export const useAllIngredientsQuery = () => {

    const { loading, data, error } = useSimpleQuery<
    AllIngredients
    >(AllIngredientsQuery);
    return { loading, data, error};
  };

export const recipeRowsPerPage = 10;
export const useFilterRecipesQuery = ({
  page,
  input,
}: {
  page: number;
  input: RecipeFilterInput | null;
}) => {

  const offset = page * recipeRowsPerPage
  const { loading, data, error } = useSimpleQuery<
  FilterRecipes
    >(FilterRecipesQuery, {
    variables: {
      input: input,
      offset: offset,
      limit: recipeRowsPerPage,
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