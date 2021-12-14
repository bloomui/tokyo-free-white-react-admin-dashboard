import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { IngredientFilterInput, ProductFilterInput } from "src/globalTypes";
import { useSimpleQuery } from "src/utilities/apollo";
import { AddIngredientMutation } from "../Ingredients/api";
import { AddProduct, AddProductVariables } from "./types/AddProduct";
import { AllSuppliers } from "./types/AllSuppliers";
import { FilterProducts } from "./types/FilterProducts";
import { product, productVariables } from "./types/product";
import { UpdateProduct, UpdateProductVariables } from "./types/UpdateProduct";

const getProductQuery = gql`
 query product ($id: String!) {
   product (id: $id) {
    id
    name
    rating
    price {
      price
      quantity {
        quantity
        unit
      }
    }
    brand
    origin
    suppliers {
      id
      name
      email
    }
}
}`;

export const useGetProductQuery = (id: string) => {

    const { loading, data, error, refetch } = useSimpleQuery<
    product,
    productVariables
    >(getProductQuery, {
      variables: {
        id: id,
      },
    });
    return { loading, data, error, refetch};
  };

export const FilterProductsQuery = gql`
query FilterProducts ($input: ProductFilterInput, $offset: Int, $limit: Int) {
    numberOfProducts  
    filterProducts (input: $input, offset: $offset, limit: $limit) {
    id
    name
    rating
    price {
      price
      quantity {
        quantity
        unit
      }
    }
    brand
    origin
    suppliers {
      id
      name
      email
    }
}
}`;

export const ProductsData = gql`
query Products {
  allBrands
  allOrigins
}
`;

export const UpdateProductMutation = gql`
mutation UpdateProduct ($input: ProductInput!, $suppliers: [String!]) {
  updateProduct (input: $input, suppliers: $suppliers)
}
`;

export const AddProductMutation = gql`
mutation AddProduct ($input: AddProductInput!, $suppliers: [String!]) {
  addProduct(input: $input, suppliers: $suppliers)
}`;

  const productRowsPerPage = 10
export const useFilterProductsQuery = ({
  input,
  page
}: {
  page: number,
  input: ProductFilterInput | null;
}) => {
  const offset = page * productRowsPerPage

  const { loading, data, error } = useSimpleQuery<
  FilterProducts
    >(FilterProductsQuery, {
    variables: {
      input: input,
      offset: offset,
      limit: productRowsPerPage
    },
  });
  return { loading, data, error};
};

export const useUpdateProduct = ({
  onCompleted,
}: {
  onCompleted: () => void;
}) => {
  const [updateProduct, { loading, error }] = useMutation<
    UpdateProduct,
    UpdateProductVariables
  >(UpdateProductMutation, {
    onCompleted: () => onCompleted(),
  });

  return {
    updateProduct,
    loading,
    error,
  };
};

export const useAddProduct = ({
  onCompleted,
}: {
  onCompleted: () => void;
}) => {
  const [addProduct, { loading, error }] = useMutation<
    AddProduct,
    AddProductVariables
  >(AddProductMutation, {
    onCompleted: () => onCompleted(),
  });

  return {
    addProduct,
    loading,
    error,
  };
};