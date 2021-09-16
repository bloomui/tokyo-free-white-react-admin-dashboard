import { Grid, TextField, Typography } from "@material-ui/core"
import Autocomplete from "@material-ui/lab/Autocomplete"
import React from "react"

export const Seasons = ({
    seasons,
    setFieldValue
  }: {
    seasons: string[] | null;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
  }) => {
    return (
      <>
  <Grid container spacing={2} xs={12}>
 <Grid key={0} item>
   <Typography>Zoek op seizoen:</Typography>
   {seasons && (
    <Autocomplete
multiple
id="tags-standard"
options={seasons.map((option) => (option))}
getOptionLabel={(option) => option? option : ""}
onChange={(event,  values) => setFieldValue("seasons", values.map((option) => option? option : ""))}
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