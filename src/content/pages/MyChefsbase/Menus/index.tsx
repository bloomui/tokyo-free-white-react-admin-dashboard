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
import { Orders } from "../../Orders";
import { FilterMenus_filterMenus } from "./types/FilterMenus";
  
  export const MenuPage = ({
    page,
    setPage,
  }: {
    page: number;
    setPage: (newPage: number) => void;
  }) => {
    const [menuForProductOverview, setMenuForProductOverview] = useState<FilterMenus_filterMenus>()
    const [openProductsForMenu, openProductOverview] = useState(false)
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
        setMenuForProductOverview={(menu) => setMenuForProductOverview(menu)}
        setOpenProductOverview={() => openProductOverview(true)}
        data={data}
        page={page}
        setPage={setPage}
        />
        </>
      );
    }
  

    if (menuForProductOverview) return (
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
        <Orders
        open={openProductsForMenu}
        onClose={() => openProductOverview(false)}
        menu={menuForProductOverview}
        />
      </>
    ); else return (
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
    )
  };