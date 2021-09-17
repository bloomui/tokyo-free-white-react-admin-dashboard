import { useQuery } from "@apollo/client";
import {
    Box,
    LinearProgress,
    Grid,
    Button,
    Card,
    CardActions,
    CardContent,
    Collapse,
    Typography,
    IconButton,
    IconButtonProps,
    styled,
  } from "@material-ui/core";
  import TablePagination from '@material-ui/core/TablePagination';
import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { VscAdd } from "react-icons/vsc";
import { LoadingScreen } from "src/components/layout";
import { SearchDirect } from "src/components/search/SearchInputField";
import { MenuFilterInput } from "src/globalTypes";
import { MenusData, useFilterMenuQuery, useMenuQuery } from "./api";
import { MenuFilterDialog } from "./filtermenus";
import { initialMenuValues } from "./filtermenus/components/initialMenuValues";
import { AddMenuDialog } from "./menuDialog/AddMenu";
import { MenuTable } from "./MenuTable";
  
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
        input: input
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
    console.log(openAddMenu)

  
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

  export const TopPartMenuPage = ({
      setOpenAddMenu,
      setInput,
  }: {
    setOpenAddMenu: () => void;
    setInput: (values: MenuFilterInput) => void;
  }) => {
    const [ openFilterInputDialog, setOpenFilterInputDialog] = React.useState(false)
    const [name, setName] = useState()

    const { loading, data, error } = useQuery(MenusData)
    if (loading) return <LoadingScreen />;
    if (error) return <LoadingScreen />;

    return (
        <MenuFilterDialog
        setOpenAddMenu={setOpenAddMenu}
        name={name}
        onClose={() => setOpenFilterInputDialog(false)}
        initialValues={initialMenuValues}
        suppliers={data.suppliers}
        products={data.products}
        dishes={data.dishes}
        recipes={data.recipes}
        ingredients={data.ingredients}
        themes={data.allThemes}
        seasons={data.allSeasons}
        onChange={(values) => setInput(values)}
        />
    )
  }
