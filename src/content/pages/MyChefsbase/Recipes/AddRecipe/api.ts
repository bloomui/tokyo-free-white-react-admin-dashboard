import { gql, useMutation } from "@apollo/client";
import { useSimpleQuery } from "src/utilities/apollo";
import { AddQuickIngredients, AddQuickIngredientsVariables } from "./types/AddQuickIngredients";
import { ingredients, ingredientsVariables } from "./types/ingredients";

export const AddQuickIngredientsMutation = gql`
mutation AddQuickIngredients ($input: [AddIngredientInput!]) {
  addQuickIngredients(input: $input)
}`;

export const useAddQuickIngredients = ({
    onCompleted,
  }: {
    onCompleted: () => void;
  }) => {
    const [addQuickIngredients, { loading, error }] = useMutation<
    AddQuickIngredients,
    AddQuickIngredientsVariables
    >(AddQuickIngredientsMutation, {
      onCompleted: () => onCompleted(),
    });
  
    return {
      addQuickIngredients,
      loading,
      error,
    };
  };
  
export const ingredientsQuery =  gql`
    query ingredients ($name: String, $offset: Int, $limit: Int, $exact: Int!) {
        numberOfIngredients
        ingredients (name: $name, offset: $offset, limit: $limit, exact: $exact) {
            id
            name
            category
            rating
        }
    }
`;



export const ingredientRowsPerPage = 10;
export const useSearchIngredientQuery = ({
    exact,
    page, 
    name
}: {
  exact: number,
    name: string,
    page: number
}) => {
    const offset = page * ingredientRowsPerPage

    const { loading, data, error, refetch } = useSimpleQuery<
    ingredients
      >(ingredientsQuery, {
      variables: {
        input: name,
        offset: offset,
        limit: ingredientRowsPerPage,
        exact: exact
      },
    });
    return { loading, data, error, refetch};
  };


