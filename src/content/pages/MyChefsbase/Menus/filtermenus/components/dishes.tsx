import { Grid, TextField, Typography } from "@material-ui/core"
import Autocomplete from "@material-ui/lab/Autocomplete"
import React from "react"
import { H5 } from "src/content/pages/Components/TextTypes"

export const Dishes = ({
    dishes,
    setFieldValue
  }: {
    dishes: string[] | null;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
  }) => {
    return (
      <>
  {/* <Grid container spacing={2} xs={12}>
  <Grid key={0} item xs={12}>
 <H5 title="Zoek op gerechten"/>
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
    </Grid> */}
    </>
    )
  }