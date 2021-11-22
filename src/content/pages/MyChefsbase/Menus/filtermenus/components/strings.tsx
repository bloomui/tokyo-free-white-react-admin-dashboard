import { Grid, Typography, TextField } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"
import React from "react"
import { H5 } from "src/content/pages/Components/TextTypes"

export const Strings = ({
    title,
    input,
    strings,
    setFieldValue
  }: {
      title: string;
      input: string;
    strings: string[] | null;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
  }) => {
    return (
      <>
  <Grid container spacing={2} xs={12}>
  <Grid key={0} item xs={12}>
 <H5 title={`Zoek op ${title}`}/>
   {strings && (
    <Autocomplete
multiple
id="tags-standard"
options={strings.map((option) => (option))}
getOptionLabel={(option) => option? option : ""}
onChange={(event,  values) => setFieldValue(input, values.map((option) => option? option : ""))}
renderInput={(params) => (
                 <TextField
                 {...params}
                 fullWidth
                label={title}
                />
  )}
  />
   )}
   
  </Grid>
    </Grid>
    </>
    )
  }