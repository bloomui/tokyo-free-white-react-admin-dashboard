import { Grid, TextField, Typography } from "@material-ui/core"
import Autocomplete from "@material-ui/lab/Autocomplete"
import React from "react"
import { H5 } from "src/content/pages/Components/TextTypes"

export const Suppliers = ({
    suppliers,
    setFieldValue
  }: {
    suppliers: string[] | null;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
  }) => {
    return (
      <>
  {/* <Grid container spacing={2} xs={12}>
 <Grid key={0} item xs={12}>
 <H5 title="Zoek op leverancier"/>
   {suppliers && (
    <Autocomplete
multiple
id="tags-standard"
options={suppliers.map((option) => (option))}
getOptionLabel={(option) => option? option.name : ""}
onChange={(event,  values: Menus_suppliers[]) => setFieldValue("suppliers", values.map((option) => option.id))}
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
    </Grid> */}
    </>
    )
  }