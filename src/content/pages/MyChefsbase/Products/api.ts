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
    price
    brand
    origin
    suppliers {
      id
      name
    }
}
}`;

export const useGetProductQuery = (id: string) => {

    const { loading, data, error } = useSimpleQuery<
    product,
    productVariables
    >(getProductQuery, {
      variables: {
        id: id,
      },
    });
    return { loading, data, error};
  };

const AllSuppliersQuery = gql`
 query AllSuppliers {
   suppliers {
     id
     name
   }
 }
`;

export const FilterProductsQuery = gql`
query FilterProducts ($input: ProductFilterInput, $offset: Int, $limit: Int) {
    numberOfProducts  
    filterProducts (input: $input, offset: $offset, limit: $limit) {
    id
    name
    rating
    price
    brand
    origin
    suppliers {
      id
      name
    }
}
}`;

export const ProductsData = gql`
query Products {
  allBrands
  allOrigins
  suppliers {
    id
    name
  }
  ingredients {
    id
    name
  }
  recipes {
    id
    name
  }
  dishes {
    id
    name
  }
  menus {
    id
    name
  }
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

export const useAllSuppliersQuery = () => {

    const { loading, data, error } = useSimpleQuery<
    AllSuppliers
    >(AllSuppliersQuery);
    return { loading, data, error};
  };

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