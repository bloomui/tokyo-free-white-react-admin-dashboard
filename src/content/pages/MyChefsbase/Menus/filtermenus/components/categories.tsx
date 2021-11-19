import { Typography, Grid, TextField, Autocomplete } from "@material-ui/core"
import React from "react"

export const Categories = ({
    allCategories,
    setFieldValue
  }: {
    allCategories: string[] | null;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
  }) => {
    return (
      <>
  <Grid container spacing={2} xs={12}>
 <Grid key={0} item>
   <Typography>Zoek op Thema's:</Typography>
   {allCategories && (
    <Autocomplete
multiple
id="tags-standard"
options={allCategories.map((option) => (option))}
getOptionLabel={(option) => option? option : ""}
onChange={(event,  values) => setFieldValue("categories", values.map((option) => option? option : ""))}
renderInput={(params) => (
                 <TextField
                 {...params}
                 fullWidth
                label="Categorieën"
                />
  )}
  />
   )}
  </Grid>
    </Grid>
    </>
    )
  }