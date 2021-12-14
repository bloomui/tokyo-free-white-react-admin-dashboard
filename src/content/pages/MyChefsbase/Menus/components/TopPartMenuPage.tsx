import { useQuery } from "@apollo/client";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { LoadingScreen } from "src/components/layout";
import { MenuFilterInput } from "src/globalTypes";
import { MenusData } from "../api";
import { MenuFilterDialog } from "../filtermenus";
import { initialMenuValues } from "../filtermenus/components/initialMenuValues";

export const TopPartMenuPage = ({
    setInput,
}: {
  setInput: (values: MenuFilterInput) => void;
}) => {
  const [ openFilterInputDialog, setOpenFilterInputDialog] = React.useState(false)

  const { loading, data, error } = useQuery(MenusData)
  if (loading) return <LoadingScreen />;
  if (error) return <LoadingScreen />;

  return (
      <MenuFilterDialog
      onClose={() => setOpenFilterInputDialog(false)}
      initialValues={initialMenuValues}
      themes={data.allThemes}
      seasons={data.allSeasons}
      onChange={(values) => setInput(values)}
      />
  )
}
