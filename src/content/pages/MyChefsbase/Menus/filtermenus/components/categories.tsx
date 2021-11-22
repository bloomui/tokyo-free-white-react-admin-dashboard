import { Typography, Grid, TextField, Autocomplete } from "@material-ui/core"
import React from "react"
import { H5 } from "src/content/pages/Components/TextTypes"

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
  <Grid key={0} item xs={12}>
 <H5 title="Zoek op categorieën"/>
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