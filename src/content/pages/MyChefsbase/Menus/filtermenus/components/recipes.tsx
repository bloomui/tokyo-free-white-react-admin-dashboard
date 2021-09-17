import { Grid, TextField, Typography } from "@material-ui/core"
import Autocomplete from "@material-ui/lab/Autocomplete"
import React from "react"
import { Menus_recipes } from "../../types/Menus"

export const Recipes = ({
    recipes,
    setFieldValue
  }: {
    recipes: Menus_recipes[] | null;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
  }) => {
    return (
      <>
  <Grid container spacing={2} xs={12}>
 <Grid key={0} item>
   <Typography>Zoek op recepten:</Typography>
   {recipes && (
    <Autocomplete
multiple
id="tags-standard"
options={recipes.map((option) => (option))}
getOptionLabel={(option) => option? option.name : ""}
onChange={(event,  values: Menus_recipes[]) => setFieldValue("recipes", values.map((option) => option.id))}
renderInput={(params) => (
                 <TextField
                 {...params}
                 fullWidth
                label="Recepten"
                />
  )}
  />
   )}
  </Grid>
    </Grid>
    </>
    )
  }

  