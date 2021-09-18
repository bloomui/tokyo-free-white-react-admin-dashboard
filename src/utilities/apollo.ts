import {
    OperationVariables,
    QueryHookOptions,
    QueryResult,
    useQuery,
  } from "@apollo/client";
  import { DocumentNode } from "graphql";
  
  export function useSimpleQuery<TData = any, TVariables = OperationVariables>(
    query: DocumentNode,
    options?: QueryHookOptions<TData, TVariables>
  ): QueryResult<TData, TVariables> {
    const result = useQuery<TData, TVariables>(query, options);
  
    const { loading, error, data } = result;
  
    if (error) {
      throw error;
    } else if (!loading && !data) {
      throw new Error("No data found");
    }
  
    return result;
  }

//   export function useLazyQuery<TData = any, TVariables = OperationVariables>(
//     query: DocumentNode,
//     options?: QueryHookOptions<TData, TVariables>
//   ): QueryResult<TData, TVariables> {
//     const result = useLazyQuery<TData, TVariables>(query, options);
  
//     const { loading, error, data } = result;
  
//     if (error) {
//       throw error;
//     } else if (!loading && !data) {
//       throw new Error("No data found");
//     }
  
//     return result;
//   }