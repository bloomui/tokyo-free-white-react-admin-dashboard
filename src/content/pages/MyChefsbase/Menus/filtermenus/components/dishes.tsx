import { Grid, TextField, Typography } from "@material-ui/core"
import Autocomplete from "@material-ui/lab/Autocomplete"
import React from "react"
import { Menus_dishes } from "../../types/Menus"

export const Dishes = ({
    dishes,
    setFieldValue
  }: {
    dishes: Menus_dishes[] | null;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
  }) => {
    return (
      <>
  <Grid container spacing={2} xs={12}>
 <Grid key={0} item>
   <Typography>Zoek op gerechten:</Typography>
   {dishes && (
    <Autocomplete
multiple
id="tags-standard"
options={dishes.map((option) => (option))}
getOptionLabel={(option) => option? option.name : ""}
onChange={(event,  values: Menus_dishes[]) => setFieldValue("dishes", values.map((option) => option.id))}
renderInput={(params) => (
                 <TextField
                 {...params}
                 fullWidth
                label="Gerechten"
                />
  )}
  />
   )}

  </Grid>
    </Grid>
    </>
    )
  }