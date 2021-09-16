import { Typography, Grid, TextField } from "@material-ui/core"
import React from "react"

export const Comment = ({
    setFieldValue
  }: {
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
  }) => {
    return (
      <>
      <Grid container spacing={2} xs={12}>
      <Grid item>
    <Typography >Opmerking:</Typography>
    </Grid>
    </Grid>
    <Grid container spacing={2} xs={12}>
    <Grid key={0} item>
      <TextField
        fullWidth
        placeholder="opmerking"
        onChange={(e) => setFieldValue("comment", e.target.value)}
      />
      </Grid>
    </Grid>
    </>
    )
  }