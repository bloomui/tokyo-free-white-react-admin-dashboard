import { Grid, TextField, Typography } from "@material-ui/core"
import Autocomplete from "@material-ui/lab/Autocomplete"
import React from "react"
import { Menus_suppliers } from "../../types/Menus"

export const Suppliers = ({
    suppliers,
    setFieldValue
  }: {
    suppliers: Menus_suppliers[] | null;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
  }) => {
    return (
      <>
  <Grid container spacing={2} xs={12}>
 <Grid key={0} item>
   <Typography>Zoek op leveranciers:</Typography>
   {suppliers && (
    <Autocomplete
multiple
id="tags-standard"
options={suppliers.map((option) => (option))}
getOptionLabel={(option) => option? option.name : ""}
onChange={(event,  values) => setFieldValue("suppliers", values.map((option) => option? option : ""))}
renderInput={(params) => (
                 <TextField
                 {...params}
                 fullWidth
                label="Leveranciers"
                />
  )}
  />
   )}
  </Grid>
    </Grid>
    </>
    )
  }