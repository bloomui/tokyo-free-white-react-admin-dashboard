import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { IngredientFilterInput } from "src/globalTypes";
import { useSimpleQuery } from "src/utilities/apollo";
import { AddIngredient, AddIngredientVariables } from "./types/AddIngredient";
import { FilterIngredients } from "./types/FilterIngredients";
import { ingredient, ingredientVariables } from "./types/ingredient";
import { UpdateIngredient, UpdateIngredientVariables } from "./types/UpdateIngredient";
import { allProducts } from "./types/AllProducts";

const getIngredientQuery = gql`
 query ingredient ($id: String!) {
   ingredient (id: $id) {
    category
    id
    name
    rating
    
    nutrition {
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
    products {
      id
      name
    }
}
}`;

export const useGetIngredientQuery = (id: string) => {

    const { loading, data, error } = useSimpleQuery<
    ingredient,
    ingredientVariables
    >(getIngredientQuery, {
      variables: {
        id: id,
      },
    });
    return { loading, data, error};
  };

const AllProductsQuery = gql`
 query allProducts {
   products {
     id
     name
   }
 }
`;

export const FilterIngredientsQuery = gql`
query FilterIngredients ($input: IngredientFilterInput) {
    filterIngredients (input: $input) {
      category
      id
      name
      rating
      
      nutrition {
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
    products {
      id
      name
    }
}
}`;

export const IngredientsData = gql`
query Ingredients {
  suppliers {
    id
    name
  }
  products {
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
  menus {
    id
    name
  }
}
`;

export const UpdateIngredientMutation = gql`
mutation UpdateIngredient ($input: IngredientInput!, $products: [String!]) {
  updateIngredient (input: $input, products: $products)
}
`;

export const AddIngredientMutation = gql`
mutation AddIngredient ($input: AddIngredientInput!, $products: [String!]) {
  addIngredient(input: $input, products: $products)
}`;

export const useAllProductsQuery = () => {

    const { loading, data, error } = useSimpleQuery<
    allProducts
    >(AllProductsQuery);
    return { loading, data, error};
  };

export const useFilterIngredientsQuery = ({
  input,
}: {
  input: IngredientFilterInput | null;
}) => {

  const { loading, data, error } = useSimpleQuery<
  FilterIngredients
    >(FilterIngredientsQuery, {
    variables: {
      input: input,
    },
  });
  return { loading, data, error};
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