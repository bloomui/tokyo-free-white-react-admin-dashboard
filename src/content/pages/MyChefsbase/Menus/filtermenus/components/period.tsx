import { Grid, TextField, Typography } from "@material-ui/core"
import Autocomplete from "@material-ui/lab/Autocomplete"
import React from "react"

export const Period = ({
    setFieldValue
  }: {
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
  }) => {
    return (
      <>
      <Grid container spacing={2} xs={12}>
      <Grid item>
    <Typography >Zoek op periode:</Typography>
    </Grid>
    </Grid>
    <Grid container spacing={2} xs={12}>
    <Grid key={0} item>
 <TextField
      fullWidth
      placeholder="Vanaf datum"
      onChange={(e) => setFieldValue("periodstartdate", e.target.value)}
    />
    </Grid>
    <Grid key={1} item>
 <TextField
      fullWidth
      placeholder="Tot datum"
      onChange={(e) => setFieldValue("periodenddate", e.target.value)}
    />
    </Grid>
    </Grid>
    </>
    )
  }