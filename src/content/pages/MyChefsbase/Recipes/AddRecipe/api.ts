import { gql } from "@apollo/client";
import { useSimpleQuery } from "src/utilities/apollo";
import { ingredients, ingredientsVariables } from "./types/ingredients";

export const ingredientsQuery =  gql`
    query ingredients ($name: String, $offset: Int, $limit: Int) {
        numberOfIngredients
        ingredients (name: $name, offset: $offset, limit: $limit) {
            id
            name
            category
            rating
        }
    }
`;

export const ingredientRowsPerPage = 10;
export const useSearchIngredientQuery = ({
    page, 
    name
}: {
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
        limit: ingredientRowsPerPage
      },
    });
    return { loading, data, error, refetch};
  };


