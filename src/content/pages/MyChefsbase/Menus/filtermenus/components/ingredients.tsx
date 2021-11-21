import { Grid, TextField, Typography } from "@material-ui/core"
import Autocomplete from "@material-ui/lab/Autocomplete"
import React from "react"
import { Menus_ingredients } from "../../types/Menus"
import { H5 } from "src/content/pages/Components/TextTypes"

export const Ingredients = ({
    ingredients,
    setFieldValue
  }: {
    ingredients: Menus_ingredients[] | null;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
  }) => {
    return (
      <>
  <Grid container spacing={2} xs={12}>
  <Grid key={0} item xs={12}>
 <H5 title="Zoek op ingredienten"/>
   {ingredients && (

<Autocomplete
multiple
id="tags-standard"
options={ingredients.map((option) => (option))}
getOptionLabel={(option) => option.name}
onChange={(event,  values: Menus_ingredients[]) => setFieldValue("ingredients", values.map((option) => option.id))}
renderInput={(params) => (
                 <TextField
                 {...params}
                 fullWidth
                label="Ingredienten"
                />
  )}
  />
   )}
  </Grid>
    </Grid>
    </>
    )
  }

  