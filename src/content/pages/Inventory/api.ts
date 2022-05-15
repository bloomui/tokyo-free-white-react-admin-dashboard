import { gql, useMutation } from "@apollo/client";
import { useSimpleQuery } from "src/utilities/apollo";
import { addToInventoryVariables, addToInventory } from "./types/addToInventory";
import { listInventory } from "./types/listInventory";

export const inventoryQuery = gql`
    query listInventory {
        listInventory {
            ingrId
            ingrName
            quantity {
                quantity
                unit
            }
            products {
                price
                id
                name
                quantity {
                    quantity
                    unit
                }
                exp
            }
        }
    }
`;

export const addToInventoryMutation = gql`
    mutation addToInventory($inventoryInput: [InventoryInput!]) {
        addToInventory(inventoryInput: $inventoryInput) 
    }
`;

export const useAddToInventory = ({ onCompleted }: { onCompleted: () => void }) => {
    const [addToInventory, { loading, error }] = useMutation<addToInventory, addToInventoryVariables>(
        addToInventoryMutation,
      {
        onCompleted: () => onCompleted(),
      }
    );
  
    return {
        addToInventory,
      loading,
      error,
    };
  };

export const useInventoryQuery = () => {

    const { loading, data, error, refetch } = useSimpleQuery<
    listInventory
    >(inventoryQuery);
    return { loading, data, error, refetch};
  };

