import { Grid, TextField, Typography } from "@material-ui/core"
import Autocomplete from "@material-ui/lab/Autocomplete"
import React from "react"
import { Menus_ingredients } from "../../types/Menus"

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
 <Grid key={0} item>
   <Typography>Zoek op ingredienten:</Typography>
   {ingredients && (

<Autocomplete
multiple
id="tags-standard"
options={ingredients.map((option) => (option))}
getOptionLabel={(option) => option? option.name : ""}
onChange={(event,  values) => setFieldValue("ingredients", values.map((option) => option? option : ""))}
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

  