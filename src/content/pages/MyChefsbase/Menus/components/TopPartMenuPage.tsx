import { useQuery } from "@apollo/client";
import React from "react";
import { useState } from "react";
import { LoadingScreen } from "src/components/layout";
import { MenuFilterInput } from "src/globalTypes";
import { MenusData } from "../api";
import { MenuFilterDialog } from "../filtermenus";
import { initialMenuValues } from "../filtermenus/components/initialMenuValues";

export const TopPartMenuPage = ({
    setOpenAddMenu,
    setInput,
}: {
  setOpenAddMenu: () => void;
  setInput: (values: MenuFilterInput) => void;
}) => {
  const [ openFilterInputDialog, setOpenFilterInputDialog] = React.useState(false)

  const { loading, data, error } = useQuery(MenusData)
  if (loading) return <LoadingScreen />;
  if (error) return <LoadingScreen />;

  return (
      <MenuFilterDialog
      setOpenAddMenu={setOpenAddMenu}
      onClose={() => setOpenFilterInputDialog(false)}
      initialValues={initialMenuValues}
      // suppliers={data.suppliers}
      // products={data.products}
      // dishes={data.dishes}
      // recipes={data.recipes}
      // ingredients={data.ingredients}
      themes={data.allThemes}
      seasons={data.allSeasons}
      onChange={(values) => setInput(values)}
      />
  )
}
