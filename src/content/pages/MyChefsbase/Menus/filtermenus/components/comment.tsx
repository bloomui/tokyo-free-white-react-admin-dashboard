import { Typography, Grid, TextField, Autocomplete } from "@material-ui/core"
import React from "react"
import { H5 } from "src/content/pages/Components/TextTypes"

export const Comment = ({
    setFieldValue
  }: {
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
  }) => {
    return (
      <>
      <Grid container spacing={2} xs={12}>
      <Grid key={0} item xs={12}>
      <H5 title="Zoek op opmerkingen"/>
    </Grid>
    </Grid>
    <Grid container spacing={2} xs={12}>
    <Grid key={0} item xs={12}>
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

  export const Comments = ({
    comments,
    setFieldValue
  }: {
    comments: string[] | null;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
  }) => {
    return (
      <>
  <Grid container spacing={2} xs={12}>
  <Grid key={0} item xs={12}>
   <H5 title="Zoek op opmerking" />
   {comments && (
    <Autocomplete
multiple
id="tags-standard"
options={comments.map((option) => (option))}
getOptionLabel={(option) => option? option : ""}
onChange={(event,  values) => setFieldValue("comment", values.map((option) => option? option : ""))}
renderInput={(params) => (
                 <TextField
                 {...params}
                 fullWidth
                label="Opmerkingen"
                />
  )}
  />
   )}
   
  </Grid>
    </Grid>
    </>
    )
  }
