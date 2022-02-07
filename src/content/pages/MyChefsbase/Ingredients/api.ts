import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { IngredientFilterInput } from "src/globalTypes";
import { useSimpleQuery } from "src/utilities/apollo";
import { AddIngredient, AddIngredientVariables } from "./types/AddIngredient";
import { FilterIngredients } from "./types/FilterIngredients";
import { ingredient, ingredientVariables } from "./types/ingredient";
import {
  UpdateIngredient,
  UpdateIngredientVariables,
} from "./types/UpdateIngredient";
import { allProducts } from "./types/AllProducts";
import { ingredientRowsPerPage } from "../Recipes/AddRecipe/api";
import { initialIngredientValues } from "./filterIngredients";

const getIngredientQuery = gql`
  query ingredient($id: String!) {
    ingredient(id: $id) {
      category
      id
      name
      rating
      material
      nutrition {
        quantity {
          quantity
          unit
        }
        nutrition {
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
      products {
        id
        name
      }
    }
  }
`;

export const useGetIngredientQuery = ({
  id,
  onCompleted,
}: {
  id: string;
  onCompleted: (ingredient: ingredient) => void;
}) => {
  const { loading, data, error } = useSimpleQuery<
    ingredient,
    ingredientVariables
  >(getIngredientQuery, {
    variables: {
      id: id,
    },
    onCompleted: (result) => {
      onCompleted(result);
    },
  });
  return { loading, data, error };
};

export const FilterIngredientsQuery = gql`
  query FilterIngredients(
    $input: IngredientFilterInput
    $offset: Int
    $limit: Int
  ) {
    numberOfIngredients
    filterIngredients(input: $input, offset: $offset, limit: $limit) {
      category
      id
      name
      rating
    }
  }
`;

export const IngredientsData = gql`
  query Ingredients {
    allCategories
  }
`;

export const UpdateIngredientMutation = gql`
  mutation UpdateIngredient($input: IngredientInput!, $products: [String!]) {
    updateIngredient(input: $input, products: $products)
  }
`;

export const AddIngredientMutation = gql`
  mutation AddIngredient($input: AddIngredientInput!, $products: [String!]) {
    addIngredient(input: $input, products: $products)
  }
`;

export const useFilterIngredientsQuery = ({
  input,
  page,
}: {
  page: number;
  input: IngredientFilterInput | null;
}) => {
  const newPage = input == initialIngredientValues ? page : 0;
  console.log(newPage);
  const offset = page * ingredientRowsPerPage;

  const { loading, data, error } = useSimpleQuery<FilterIngredients>(
    FilterIngredientsQuery,
    {
      variables: {
        input: input,
        offset: offset,
        limit: ingredientRowsPerPage,
      },
    }
  );
  return { loading, data, error };
};

export const useUpdateIngredient = ({
  onCompleted,
}: {
  onCompleted: () => void;
}) => {
  const [updateIngredient, { loading, error }] = useMutation<
    UpdateIngredient,
    UpdateIngredientVariables
  >(UpdateIngredientMutation, {
    onCompleted: () => onCompleted(),
  });

  return {
    updateIngredient,
    loading,
    error,
  };
};

export const useAddIngredient = ({
  onCompleted,
}: {
  onCompleted: () => void;
}) => {
  const [addIngredient, { loading, error }] = useMutation<
    AddIngredient,
    AddIngredientVariables
  >(AddIngredientMutation, {
    onCompleted: () => onCompleted(),
  });

  return {
    addIngredient,
    loading,
    error,
  };
};
