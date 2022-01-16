import { gql, useMutation } from "@apollo/client";
import { useSimpleQuery } from "src/utilities/apollo";
import { AddQuickProducts, AddQuickProductsVariables } from "./types/AddQuickProducts";
import { products } from "./types/products";
import { searchIngredient, searchIngredientVariables } from "./types/searchIngredient";
import { searchProduct, searchProductVariables } from "./types/searchProduct";


export const AddQuickProductsMutation = gql`
mutation AddQuickProducts ($input: [AddProductInput!]) {
  addQuickProducts(input: $input)
}`;

export const useAddQuickProducts = ({
    onCompleted,
  }: {
    onCompleted: () => void;
  }) => {
    const [addQuickProducts, { loading, error }] = useMutation<
    AddQuickProducts,
    AddQuickProductsVariables
    >(AddQuickProductsMutation, {
      onCompleted: () => onCompleted(),
    });
  
    return {
      addQuickProducts,
      loading,
      error,
    };
  };

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

export const searchIngredientsQuery =  gql`
    query searchIngredient ($ingredientname: String) {
      searchIngredient (ingredientname: $ingredientname) {
            id
            name
        }
    }
`;

export const useSearchIngredientFilterQuery = ({
  name
}: {
  name: string
}) => {

  const { loading, data, error, refetch } = useSimpleQuery<
  searchIngredient, searchIngredientVariables
    >(searchIngredientsQuery, {
    variables: {
      ingredientname: name
    },
  });
  return { loading, data, error, refetch};
};

export const searchProductsQuery =  gql`
    query searchProduct ($productname: String) {
      searchProduct (productname: $productname) {
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
  searchProduct, searchProductVariables
    >(searchProductsQuery, {
    variables: {
      productname: productname
    },
  });
  return { loading, data, error, refetch};
};


export const productsRowsPerPage = 10;
export const useSearchProductQuery = ({
    name,
    page
}: {
    name: string,
    page: number
  }) => {
      const offset = page * productsRowsPerPage

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
