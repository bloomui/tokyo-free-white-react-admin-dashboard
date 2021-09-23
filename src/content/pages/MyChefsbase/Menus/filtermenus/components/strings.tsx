import { Grid, Typography, TextField } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"
import React from "react"

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
 <Grid key={0} item>
   <Typography>Zoek op {title}:</Typography>
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
                label="Seizoenen"
                />
  )}
  />
   )}
   
  </Grid>
    </Grid>
    </>
    )
  }