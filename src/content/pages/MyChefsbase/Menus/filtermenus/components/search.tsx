import { Grid, TextField, Typography } from "@material-ui/core"
import Autocomplete from "@material-ui/lab/Autocomplete"
import React from "react"

export const Search = ({
    setFieldValue
  }: {
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
  }) => {
    return (
      <>
  <Grid container spacing={2} xs={12}>
 <Grid key={0} item>
   <Typography>Zoek op naam:</Typography>
 <TextField
      fullWidth
      placeholder="search"
      onChange={(e) => setFieldValue("name", e.target.value)}
    />
    </Grid>
    </Grid>
    </>
    )
  }