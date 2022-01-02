import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { LoadingScreen } from "src/components/layout";
import { DishFilterInput } from "src/globalTypes";
import { DishFilter } from "../filterdishes";
import { DishesData } from "../api";


export const TopPartDishPage = ({
    setInput,
}: {
  setInput: (values: DishFilterInput) => void;
}) => {
  const { loading, data, error } = useQuery(DishesData)
  if (loading) return <LoadingScreen />;
  if (error) return <LoadingScreen />;

  return (
    <DishFilter
    themes={data.allThemes}
    comments={data.allComments}
    onChange={(values) => setInput(values)}
    />
  )
}