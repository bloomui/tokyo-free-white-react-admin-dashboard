import { Grid, TextField, Typography } from "@material-ui/core"
import Autocomplete from "@material-ui/lab/Autocomplete"
import React from "react"

export const Prices = ({
    setFieldValue
  }: {
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
  }) => {
    return (
      <>
      <Grid container spacing={2} xs={12}>
      <Grid item>
    <Typography >Minimum en maximum prijs:</Typography>
    </Grid>
    </Grid>
    <Grid container spacing={2} xs={12}>
    <Grid key={0} item>
 <TextField
      fullWidth
      placeholder="Minimum prijs"
      onChange={(e) => setFieldValue("minPrice", e.target.value)}
    />
    </Grid>
    <Grid key={1} item>
 <TextField
      fullWidth
      placeholder="Maximale prijs"
      onChange={(e) => setFieldValue("maxPrice", e.target.value)}
    />
    </Grid>
    </Grid>
    </>
    )
  }