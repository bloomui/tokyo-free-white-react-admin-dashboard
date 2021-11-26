import { gql } from "@apollo/client";
import { useSimpleQuery } from "src/utilities/apollo";
import { IngredientsForMenu, IngredientsForMenuVariables } from "./types/IngredientsForMenu";

export const IngredientsForMenuQuery = gql`
query IngredientsForMenu ($id: String!){
    ingredientsForMenu (id: $id) {
        quantity {
          quantity
          unit
        }
        ingredient {
          id
          name
          products {
            id
            name
            price {
              price 
              quantity {
                quantity
                unit
            }
          }
        }
      }
    }
  }`;

  export const useGetIngredientsForMenuQuery = (id: string) => {

    const { loading, data, error, refetch } = useSimpleQuery<
    IngredientsForMenu,
    IngredientsForMenuVariables
    >(IngredientsForMenuQuery, {
      variables: {
        id: id,
      },
    });
    return { loading, data, error, refetch};
  };