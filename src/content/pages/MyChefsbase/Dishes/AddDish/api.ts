import { gql } from "@apollo/client";
import { useSimpleQuery } from "src/utilities/apollo";
import { recipes } from "./types/recipes";

export const recipesQuery =  gql`
    query recipes ($name: String, $offset: Int, $limit: Int) {
        numberOfRecipes
        recipes (name: $name, offset: $offset, limit: $limit) {
            id
            name
            type
            rating
        }
    }
`;

export const recipeRowsPerPage = 10;
export const useSearchRecipeQuery = ({
    page, 
    name
}: {
    name: string,
    page: number
}) => {
    const offset = page * recipeRowsPerPage

    const { loading, data, error, refetch } = useSimpleQuery<
    recipes
      >(recipesQuery, {
      variables: {
        input: name,
        offset: offset,
        limit: recipeRowsPerPage
      },
    });
    return { loading, data, error, refetch};
  };


