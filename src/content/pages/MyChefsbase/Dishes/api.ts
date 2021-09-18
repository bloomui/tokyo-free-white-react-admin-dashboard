import { gql } from "@apollo/client";
import { useRef } from "react";
import { useMutation } from "@apollo/client";
import { AddDish, AddDishVariables } from "./types/AddDish";
import { DishFilterInput } from "src/globalTypes";
import { useSimpleQuery } from "src/utilities/apollo";
import { Dishes, DishesVariables } from "./types/Dishes";
import { UpdateDish, UpdateDishVariables } from "./types/UpdateDish";

const DishesData = gql`
query Dishes ($input: DishFilterInput) {
  allThemes
  allTypes
  filterDishes (input: $input) {
    id
    comment
    name
    rating
    theme
    method {
        step 
        method
    }
    recipes {
      quantity {
        quantity
        unit
      }
      recipe {
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
  menus {
    id
    name
  }
}
`;

export const UpdateDishMutation = gql`
mutation UpdateDish ($input: DishInput!, $recipes: [QuantityToId!], $method: [StepToMethodInput!]) {
  updateDish (input: $input, recipes: $recipes, method: $method)
}
`;

export const AddDishMutation = gql`
mutation AddDish ($input: AddDishInput!, $recipes: [QuantityToId!], $method: [StepToMethodInput!]) {
  addDish(input: $input, recipes: $recipes, method: $method)
}`;

export const useDishQuery = ({
  input,
}: {
  input: DishFilterInput | null;
}) => {

  const { loading, data, error } = useSimpleQuery<
  Dishes,
  DishesVariables
  >(DishesData, {
    variables: {
      input: input,
    },
  });
  return { loading, data, error};
};

export const useUpdateDish = ({
  onCompleted,
}: {
  onCompleted: () => void;
}) => {
  const [updateDish, { loading, error }] = useMutation<
    UpdateDish,
    UpdateDishVariables
  >(UpdateDishMutation, {
    onCompleted: () => onCompleted(),
  });

  return {
    updateDish,
    loading,
    error,
  };
};

export const useAddDish = ({
  onCompleted,
}: {
  onCompleted: () => void;
}) => {
  const [addDish, { loading, error }] = useMutation<
    AddDish,
    AddDishVariables
  >(AddDishMutation, {
    onCompleted: () => onCompleted(),
  });

  return {
    addDish,
    loading,
    error,
  };
};