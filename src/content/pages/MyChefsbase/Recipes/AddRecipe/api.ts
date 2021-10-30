import { gql } from "@apollo/client";
import { useSimpleQuery } from "src/utilities/apollo";
import { ingredients, ingredientsVariables } from "./types/ingredients";

export const ingredientsQuery =  gql`
    query ingredients ($name: String) {
        ingredients (name: $name) {
            id
            name
            category
            rating
        }
    }
`;

export const useSearchIngredientQuery = ({name}: {name: string}) => {

    const { loading, data, error, refetch } = useSimpleQuery<
    ingredients
      >(ingredientsQuery, {
      variables: {
        input: name,
      },
    });
    return { loading, data, error, refetch};
  };


