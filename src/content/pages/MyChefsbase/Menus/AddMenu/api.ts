import { gql } from "@apollo/client";
import { useSimpleQuery } from "src/utilities/apollo";
import { dishes } from "./types/dishes";

export const dishesQuery =  gql`
    query dishes ($name: String, $offset: Int, $limit: Int) {
        numberOfDishes
        dishes (name: $name, offset: $offset, limit: $limit) {
            id
            name
            type
            rating
            theme
        }
    }
`;

export const dishRowsPerPage = 10;
export const useSearchRecipeQuery = ({
    page, 
    name
}: {
    name: string,
    page: number
}) => {
    const offset = page * dishRowsPerPage

    const { loading, data, error, refetch } = useSimpleQuery<
    dishes
      >(dishesQuery, {
      variables: {
        input: name,
        offset: offset,
        limit: dishRowsPerPage
      },
    });
    return { loading, data, error, refetch};
  };


