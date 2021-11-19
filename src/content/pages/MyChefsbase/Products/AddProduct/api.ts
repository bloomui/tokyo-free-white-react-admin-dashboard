import { gql } from "@apollo/client";
import { useSimpleQuery } from "src/utilities/apollo";
import { suppliers } from "./types/suppliers";

export const suppliersQuery =  gql`
    query suppliers ($name: String, $offset: Int, $limit: Int) {
        numberOfSuppliers
        suppliers (name: $name, offset: $offset, limit: $limit) {
            id
            name
            email
            rating
        }
    }
`;

export const suppliersRowsPerPage = 10;
export const useSearchSupplierQuery = ({
    page, 
    name
}: {
    name: string,
    page: number
}) => {
    const offset = page * suppliersRowsPerPage

    const { loading, data, error, refetch } = useSimpleQuery<
    suppliers
      >(suppliersQuery, {
      variables: {
        input: name,
        offset: offset,
        limit: suppliersRowsPerPage
      },
    });
    return { loading, data, error, refetch};
  };
