import { Grid, TextField, Typography } from "@material-ui/core"
import Autocomplete from "@material-ui/lab/Autocomplete"
import React from "react"
import { H5 } from "src/content/pages/Components/TextTypes"

export const Search = ({
    placeholder,
    setFieldValue
  }: {
    placeholder: string | null;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
  }) => {
    return (
      <>
  <Grid container spacing={2} xs={12}>
  <Grid key={0} item xs={12}>
 <H5 title="Zoek op naam"/>
 <TextField
      fullWidth
      placeholder={placeholder}
      onChange={(e) => setFieldValue("name", e.target.value)}
    />
    </Grid>
    </Grid>
    </>
    )
  }