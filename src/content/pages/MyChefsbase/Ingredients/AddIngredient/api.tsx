import { gql } from "@apollo/client";
import { useSimpleQuery } from "src/utilities/apollo";
import { products } from "./types/products";

export const productsQuery =  gql`
    query products ($name: String, $offset: Int, $limit: Int) {
        numberOfProducts
        products (name: $name, offset: $offset, limit: $limit) {
            id
            name
            brand
            origin
            rating
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

export const searchProductsQuery =  gql`
    query searchProduct ($productname: String!) {
        products (productname: $productname) {
            id
            name
        }
    }
`;
export const useSearchProductFilterQuery = ({
  productname
}: {
  productname: string
}) => {

  const { loading, data, error, refetch } = useSimpleQuery<
  products
    >(productsQuery, {
    variables: {
      productname: productname
    },
  });
  return { loading, data, error, refetch};
};


export const productsRowsPerPage = 10;
export const useSearchProductQuery = ({
    page, 
    name
}: {
    name: string,
    page: number
}) => {
    const offset = (page == 0)? productsRowsPerPage : page * productsRowsPerPage

    const { loading, data, error, refetch } = useSimpleQuery<
    products
      >(productsQuery, {
      variables: {
        input: name,
        offset: offset,
        limit: productsRowsPerPage
      },
    });
    return { loading, data, error, refetch};
  };
