import { H5 } from "src/content/pages/Components/TextTypes"
import { Grid, TextField, Typography } from "@material-ui/core"
import Autocomplete from "@material-ui/lab/Autocomplete"
import React from "react"

export const Menus = ({
    menus,
    setFieldValue
  }: {
    menus: string[] | null;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
  }) => {
    return (
      <>
  {/* <Grid container spacing={2} xs={12}>
  <Grid key={0} item xs={12}>
 <H5 title="Zoek op menus"/>
   {menus && (
    <Autocomplete
multiple
id="tags-standard"
options={menus.map((option) => (option))}
getOptionLabel={(option) => option? option.name : ""}
onChange={(event,  values: Dishes_menus[]) => setFieldValue("menus", values.map((option) => option.id))}
renderInput={(params) => (
                 <TextField
                 {...params}
                 fullWidth
                label="Menu's"
                />
  )}
  />
   )}

  </Grid>
    </Grid> */}
    </>
    )
  }