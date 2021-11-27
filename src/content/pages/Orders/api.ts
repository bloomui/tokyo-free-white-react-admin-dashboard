import { gql } from "@apollo/client";
import { useSimpleQuery } from "src/utilities/apollo";
import { GetProducts, GetProductsVariables } from "./types/GetProducts";
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

  export const getProductQuery = gql`
query GetProducts ($ids: [String!]){
    getProducts (ids: $ids) {
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
`;

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

  export const useGetProducts = ({ids}: {ids: string[]}) => {

    const { loading, data, error, refetch } = useSimpleQuery<
    GetProducts,
    GetProductsVariables
    >(getProductQuery, {
      variables: {
        ids: ids,
      },
    });
    return { loading, data, error, refetch};
  };