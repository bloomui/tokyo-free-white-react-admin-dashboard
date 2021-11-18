import {
    Box,
    LinearProgress,
    Grid,
  } from "@material-ui/core";
import React, { useState } from "react";
import { LoadingScreen } from "src/components/layout";
import { DishFilterInput } from "src/globalTypes";
import { useFilterDishesQuery } from "./api";
import { DishTable } from "./components/DishTable";
import { TopPartDishPage } from "./components/TopPartDishPage";
import { AddDishDialog } from "./dishDialogs/AddDishDialog";
import { DishFilter, initialValues } from "./filterdishes";
  
  export const DishPage = ({
    page,
    setPage,
  }: {
    page: number;
    setPage: (newPage: number) => void;
  }) => {
    const [openAddDish, setOpenAddDish] = useState(false)
    const [ input, setInput] = useState<DishFilterInput>(initialValues);

    const { loading, data } = useFilterDishesQuery({
      page: page,
      input: input,
      });
  
    let content;
    if (loading && !data) content = <LoadingScreen />;
    else if (data) {
      content = (
        <>
        <DishTable
        data={data}
        page={page}
        setPage={setPage}
        />
        </>
      );
    }
  
    return (
      <>
      <TopPartDishPage
          setOpenAddDish={() => setOpenAddDish(true)} 
          setInput={(values) => setInput(values)}/>
        <Box height={3}>{loading && <LinearProgress />}</Box>
        {content}
        <AddDishDialog 
                  open={openAddDish}
                  onClose={() => setOpenAddDish(false)}
                  />
      </>
    );
  };