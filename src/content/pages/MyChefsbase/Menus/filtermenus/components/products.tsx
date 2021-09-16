import { Grid, TextField, Typography } from "@material-ui/core"
import Autocomplete from "@material-ui/lab/Autocomplete"
import React from "react"
import { Menus_products } from "../../types/Menus"

export const Products = ({
    products,
    setFieldValue
  }: {
    products: Menus_products[] | null;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
  }) => {
    return (
      <>
  <Grid container spacing={2} xs={12}>
 <Grid key={0} item>
   <Typography>Zoek op producten:</Typography>
   {products && (

<Autocomplete
multiple
id="tags-standard"
options={products.map((option) => (option))}
getOptionLabel={(option) => option? option.name : ""}
onChange={(event,  values) => setFieldValue("products", values.map((option) => option? option : ""))}
renderInput={(params) => (
                 <TextField
                 {...params}
                 fullWidth
                label="Producten"
                />
  )}
  />
   )}
  </Grid>
    </Grid>
    </>
    )
  }