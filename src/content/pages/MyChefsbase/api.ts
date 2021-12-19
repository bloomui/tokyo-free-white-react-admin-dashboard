import { gql } from "@apollo/client";
import { useSimpleQuery } from "src/utilities/apollo";
import { viewer } from "./types/viewer";

const viewerQuery = gql`
 query viewer {
   viewer {
    id
    email
    username
    fullName
    restaurantName
    description
    location
   }
}`;

export const useViewerQuery = () => {

    const { loading, data, error, refetch } = useSimpleQuery<
    viewer
    >(viewerQuery);
    return { loading, data, error, refetch};
  };