import { Grid, TextField, Typography } from "@material-ui/core"
import Autocomplete from "@material-ui/lab/Autocomplete"
import React from "react"
import { H5 } from "src/content/pages/Components/TextTypes"

export const Types = ({
    types,
    setFieldValue
  }: {
    types: string[] | null;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
  }) => {
    return (
      <>
  <Grid container spacing={2} xs={12}>
  <Grid key={0} item xs={12}>
   <H5 title="Zoek op Type"/>
   {types && (
    <Autocomplete
multiple
id="tags-standard"
options={types.map((option) => (option))}
getOptionLabel={(option) => option? option : ""}
onChange={(event,  values) => setFieldValue("types", values.map((option) => option? option : ""))}
renderInput={(params) => (
                 <TextField
                 {...params}
                 fullWidth
                label="Type's"
                />
  )}
  />
   )}
   
  </Grid>
    </Grid>
    </>
    )
  }