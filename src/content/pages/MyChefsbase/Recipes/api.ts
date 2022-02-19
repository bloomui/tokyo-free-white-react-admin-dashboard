import { gql } from "@apollo/client";
import { useRef } from "react";
import { useMutation } from "@apollo/client";
import { DishFilterInput, RecipeFilterInput } from "src/globalTypes";
import { useSimpleQuery } from "src/utilities/apollo";
import { AddRecipe, AddRecipeVariables } from "./types/AddRecipe";
import { FilterRecipes } from "./types/FilterRecipes";
import { recipe, recipeVariables } from "./types/recipe";
import { UpdateRecipe, UpdateRecipeVariables } from "./types/UpdateRecipe";
import {
  NutritionForRecipe,
  NutritionForRecipeVariables,
} from "./types/NutritionForRecipe";
import {
  ingredientsForRecipe,
  ingredientsForRecipeVariables,
} from "./types/ingredientsForRecipe";

const getRecipeQuery = gql`
  query recipe($id: String!) {
    recipe(id: $id) {
      id
      name
      rating
      type
      quantity {
        unit
        quantity
      }
      method {
        step
        method
      }
    }
  }
`;

export const useGetRecipeQuery = ({
  id,
  onCompleted,
}: {
  id: string;
  onCompleted?: (result: recipe) => void;
}) => {
  const { loading, data, error } = useSimpleQuery<recipe, recipeVariables>(
    getRecipeQuery,
    {
      variables: {
        id: id,
      },
      onCompleted: (result) => onCompleted(result),
    }
  );
  return { loading, data, error };
};

export const FilterRecipesQuery = gql`
  query FilterRecipes($input: RecipeFilterInput, $offset: Int, $limit: Int) {
    numberOfRecipes
    filterRecipes(input: $input, offset: $offset, limit: $limit) {
      id
      name
      rating
      type
      quantity {
        quantity 
        unit
      }
    }
  }
`;

export const RecipesData = gql`
  query Recipes {
    allTypes
  }
`;

export const IngredientsForRecipeQuery = gql`
  query ingredientsForRecipe($id: String!, $quantity: Float!, $unit: String!) {
    ingredientsForRecipe(id: $id, quantity: $quantity, unit: $unit) {
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
  query NutritionForRecipe($id: String!, $quantity: Float!, $unit: String!) {
    nutritionForRecipe(id: $id, quantity: $quantity, unit: $unit) {
      kcal
      protein {
        plant
        animal
        total
      }
      carbs {
        carbs
        sugar
      }
      fat {
        satured
        singleUnsat
        compoundUnsat
        total
      }
      starch
      polyols
      fibres
      nitrogen
      polysachhariden
      alcohol
      water
      organicAcids
      vitamins {
        e
        c
        kTotal
        b12
        dTotal
      }
      foliumAcid
      pholate
      pholatEquivalents
      nicotinAcid
      lycopeans
      betaCrypto
      zeacanthine
      lutein
      ash
      jodium
      sink
      selenium
      cupper
      iron {
        total
      }
      magnesium
      fosfor
      calcium
      kalium
      natrium
      cholesterol
      famstxr
    }
  }
`;

export const UpdateRecipeMutation = gql`
  mutation UpdateRecipe(
    $input: RecipeInput!
    $ingredients: [QuantityToId!]
    $method: [StepToMethodInput!]!
  ) {
    updateRecipe(input: $input, ingredients: $ingredients, method: $method)
  }
`;

export const AddRecipeMutation = gql`
  mutation AddRecipe(
    $input: AddRecipeInput!
    $ingredients: [QuantityToId!]
    $newIngredients: [NewIngredientInput!]
    $method: [StepToMethodInput!]!
  ) {
    addRecipe(input: $input, ingredients: $ingredients, method: $method,  newIngredients: $newIngredients)
  }
`;

export const useGetNutritionForRecipe = ({
  id,
  quantity,
  unit,
}: {
  id: string;
  quantity: number;
  unit: string;
}) => {
  const { loading, data, error, refetch } = useSimpleQuery<
    NutritionForRecipe,
    NutritionForRecipeVariables
  >(NutritionForRecipeQuery, {
    variables: {
      id: id,
      quantity: quantity,
      unit: unit,
    },
  });
  return { loading, data, error, refetch };
};

export const useGetIngredientsForRecipe = ({
  id,
  quantity,
  unit,
  onCompleted,
}: {
  id: string;
  quantity: number;
  unit: string;
  onCompleted?: (ingredientsForRecipe: ingredientsForRecipe) => void;
}) => {
  const { loading, data, error, refetch } = useSimpleQuery<
    ingredientsForRecipe,
    ingredientsForRecipeVariables
  >(IngredientsForRecipeQuery, {
    variables: {
      id: id,
      quantity: quantity,
      unit: unit,
    },
    onCompleted: (result) => {
      onCompleted(result);
    },
  });
  return { loading, data, error, refetch };
};

export const recipeRowsPerPage = 10;
export const useFilterRecipesQuery = ({
  page,
  input,
}: {
  page: number;
  input: RecipeFilterInput | null;
}) => {
  const offset = page * recipeRowsPerPage;
  const { loading, data, error } = useSimpleQuery<FilterRecipes>(
    FilterRecipesQuery,
    {
      variables: {
        input: input,
        offset: offset,
        limit: recipeRowsPerPage,
      },
    }
  );
  return { loading, data, error };
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

export const useAddRecipe = ({ onCompleted }: { onCompleted: () => void }) => {
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
