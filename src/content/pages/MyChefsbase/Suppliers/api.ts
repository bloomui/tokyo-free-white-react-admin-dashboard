import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { IngredientFilterInput, SupplierFilterInput } from "src/globalTypes";
import { useSimpleQuery } from "src/utilities/apollo";
import { AddSupplier, AddSupplierVariables } from "./types/AddSupplier";
import { FilterSuppliers } from "./types/FilterSuppliers";
import { supplier, supplierVariables } from "./types/supplier";
import { UpdateSupplier, UpdateSupplierVariables } from "./types/UpdateSupplier";

const getSupplierQuery = gql`
 query supplier ($id: String!) {
   supplier (id: $id) {
    id
    name
    rating
    email
}
}`;

export const useGetSupplierQuery = (id: string) => {

    const { loading, data, error } = useSimpleQuery<
    supplier,
    supplierVariables
    >(getSupplierQuery, {
      variables: {
        id: id,
      },
    });
    return { loading, data, error};
  };

export const FilterSuppliersQuery = gql`
query FilterSuppliers ($input: SupplierFilterInput, $offset: Int, $limit: Int) {
    numberOfSuppliers
    filterSuppliers (input: $input, offset: $offset, limit: $limit) {
    id
    name
    rating
    email
}
}`;

export const SuppliersData = gql`
query Suppliers {
  products {
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

export const UpdateSupplierMutation = gql`
mutation UpdateSupplier ($input: SupplierInput!) {
    updateSupplier (input: $input)
}
`;

export const AddSupplierMutation = gql`
mutation AddSupplier ($input: AddSupplierInput!) {
  addSupplier(input: $input)
}`;

const productRowsPerPage = 10

export const useFilterSuppliersQuery = ({
  page,
  input,
}: {
  page: number;
  input: SupplierFilterInput | null;
}) => {

  const offset = productRowsPerPage * page
  const { loading, data, error } = useSimpleQuery<
  FilterSuppliers
    >(FilterSuppliersQuery, {
    variables: {
      input: input,
      offset: offset,
      limit: productRowsPerPage
    },
  });
  return { loading, data, error};
};

export const useUpdateSupplier = ({
  onCompleted,
}: {
  onCompleted: () => void;
}) => {
  const [updateSupplier, { loading, error }] = useMutation<
    UpdateSupplier,
    UpdateSupplierVariables
  >(UpdateSupplierMutation, {
    onCompleted: () => onCompleted(),
  });

  return {
    updateSupplier,
    loading,
    error,
  };
};

export const useAddSupplier = ({
  onCompleted,
}: {
  onCompleted: () => void;
}) => {
  const [addSupplier, { loading, error }] = useMutation<
    AddSupplier,
    AddSupplierVariables
  >(AddSupplierMutation, {
    onCompleted: () => onCompleted(),
  });

  return {
    addSupplier,
    loading,
    error,
  };
};