import { Grid, TextField, Typography } from "@material-ui/core"
import Autocomplete from "@material-ui/lab/Autocomplete"
import React from "react"
import { Menus_products } from "../../types/Menus"
import { H5 } from "src/content/pages/Components/TextTypes"

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
  <Grid key={0} item xs={12}>
 <H5 title="Zoek op producten"/>
   {products && (

<Autocomplete
multiple
id="tags-standard"
options={products.map((option) => (option))}
getOptionLabel={(option) => option? option.name : ""}
onChange={(event,  values: Menus_products[]) => setFieldValue("products", values.map((option) => option.id))}
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