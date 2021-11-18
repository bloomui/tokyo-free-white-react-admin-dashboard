import { useQuery } from "@apollo/client";
import {
    Box,
    LinearProgress,
  } from "@material-ui/core";
import React, { useState } from "react";
import { LoadingScreen } from "src/components/layout";
import { MenuFilterInput } from "src/globalTypes";
import { useFilterMenuQuery } from "./api";
import { initialMenuValues } from "./filtermenus/components/initialMenuValues";
import { AddMenuDialog } from "./menuDialog/AddMenu";
import { MenuTable } from "./components/MenuTable";
import { TopPartMenuPage } from "./components/TopPartMenuPage";
  
  export const MenuPage = ({
    page,
    setPage,
  }: {
    page: number;
    setPage: (newPage: number) => void;
  }) => {

    const [openAddMenu, setOpenAddMenu] = useState(false)
    const [ input, setInput] = useState<MenuFilterInput>(initialMenuValues);
    const { loading, data } = useFilterMenuQuery({
        input: input,
        page: page,
    })
    
    let content;
    if (loading && !data) content = <LoadingScreen />;
    else if (data) {
      content = (
        <>
        <MenuTable
        data={data}
        page={page}
        setPage={setPage}
        />
        </>
      );
    }
  
    return (
      <>
      <TopPartMenuPage 
      setOpenAddMenu={() => setOpenAddMenu(true)} 
      setInput={(values) => setInput(values)}/>
          <Box height={3}>{loading && <LinearProgress />}</Box>
        {content}
        <AddMenuDialog 
                  open={openAddMenu}
                  onClose={() => setOpenAddMenu(false)}
                  />
      </>
    );
  };