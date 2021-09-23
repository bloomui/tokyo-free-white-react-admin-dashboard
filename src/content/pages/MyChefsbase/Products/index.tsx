import { useQuery } from "@apollo/client";
import {
    Box,
    LinearProgress,
  } from "@material-ui/core";
import React, { useState } from "react";
import { LoadingScreen } from "src/components/layout";
import { MenuFilterInput, ProductFilterInput } from "src/globalTypes";
import { useFilterProductsQuery } from "./api";
import { TopPartProductPage } from "./components/ProductPageTopPart";
import { ProductTable } from "./components/ProductTable";
import { initialProductValues } from "./filterproducts";
import { AddProductDialog } from "./productDialogs/AddProductDialog";
  
  export const ProductPage = ({
    page,
    setPage,
  }: {
    page: number;
    setPage: (newPage: number) => void;
  }) => {

    const [openAddMenu, setOpenAddProduct] = useState(false)
    const [ input, setInput] = useState<ProductFilterInput>(initialProductValues);
    const { loading, data } = useFilterProductsQuery({
        input: input
    })
    
    let content;
    if (loading && !data) content = <LoadingScreen />;
    else if (data) {
      content = (
        <>
        <ProductTable
        data={data}
        page={page}
        setPage={setPage}
        />
        </>
      );
    }
  
    return (
      <>
      <TopPartProductPage 
      setOpenAddProduct={() => setOpenAddProduct(true)} 
      setInput={(values) => setInput(values)}/>
          <Box height={3}>{loading && <LinearProgress />}</Box>
        {content}
        <AddProductDialog 
                  open={openAddMenu}
                  onClose={() => setOpenAddProduct(false)}
                  />
      </>
    );
  };