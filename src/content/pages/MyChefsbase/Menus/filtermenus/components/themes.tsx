import { Grid, TextField, Typography } from "@material-ui/core"
import Autocomplete from "@material-ui/lab/Autocomplete"
import React from "react"
import { H5 } from "src/content/pages/Components/TextTypes"

export const Themes = ({
    themes,
    setFieldValue
  }: {
    themes: string[] | null;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
  }) => {
    return (
      <>
  <Grid container spacing={2} xs={12}>
  <Grid key={0} item xs={12}>
 <H5 title="Zoek op Thema"/>
   {themes && (
    <Autocomplete
multiple
id="tags-standard"
options={themes.map((option) => (option))}
getOptionLabel={(option) => option? option : ""}
onChange={(event,  values) => setFieldValue("themes", values.map((option) => option? option : ""))}
renderInput={(params) => (
                 <TextField
                 {...params}
                 fullWidth
                label="Thema's"
                />
  )}
  />
   )}
  </Grid>
    </Grid>
    </>
    )
  }