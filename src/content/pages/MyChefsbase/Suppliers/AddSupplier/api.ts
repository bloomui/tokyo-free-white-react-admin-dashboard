import { gql, useMutation } from "@apollo/client";
import { AddSuppliers, AddSuppliersVariables } from "./types/AddSuppliers";

export const AddSuppliersMutation = gql`
mutation AddSuppliers ($input: [AddSupplierInput!]) {
  addSuppliers(input: $input)
}`;

export const useAddSuppliers = ({
    onCompleted,
  }: {
    onCompleted: () => void;
  }) => {
    const [addSuppliers, { loading, error }] = useMutation<
      AddSuppliers,
      AddSuppliersVariables
    >(AddSuppliersMutation, {
      onCompleted: () => onCompleted(),
    });
  
    return {
      addSuppliers,
      loading,
      error,
    };
  };