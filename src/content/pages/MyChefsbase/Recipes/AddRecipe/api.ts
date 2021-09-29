import { gql } from "@apollo/client";

export const ingredientsQuery =  gql`
    query ingredients {
        ingredients {
            id
            name
            rating
        }
    }
`;

