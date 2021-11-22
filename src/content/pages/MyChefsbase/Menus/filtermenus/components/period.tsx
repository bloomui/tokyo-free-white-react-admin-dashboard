import { Grid, TextField, Typography } from "@material-ui/core"
import Autocomplete from "@material-ui/lab/Autocomplete"
import React from "react"
import { H5 } from "src/content/pages/Components/TextTypes"

export const Period = ({
    setFieldValue
  }: {
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
  }) => {
    return (
      <>
      <Grid container spacing={2} xs={12}>
      <Grid item xs={12}>
    <H5 title="Zoek op periode"/>
    </Grid>
    <Grid item xs={5}>
 <TextField
      fullWidth
      placeholder="Vanaf datum"
      onChange={(e) => setFieldValue("periodstartdate", e.target.value)}
    />
    </Grid>
    <Grid item xs={1}></Grid>
    <Grid item xs={5}>
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