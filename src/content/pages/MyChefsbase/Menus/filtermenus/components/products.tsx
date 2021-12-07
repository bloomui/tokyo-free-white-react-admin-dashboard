import { Grid, TextField, Typography } from "@material-ui/core"
import Autocomplete from "@material-ui/lab/Autocomplete"
import React, { useState } from "react"
import { LoadingScreen } from "src/components/layout"
import { H5 } from "src/content/pages/Components/TextTypes"
import { AutoSubmitToken } from ".."
import { useSearchProductFilterQuery } from "../../../Ingredients/AddIngredient/api"
import { searchProduct_searchProduct } from "../../../Ingredients/AddIngredient/types/searchProduct"

export const Products = ({
    // products,
    setFieldValue
  }: {
    // products: string[] | null;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
  }) => {
    const [productname, setProductname] = useState('')

    const { data, loading, error, refetch } = useSearchProductFilterQuery({productname: productname})
    
    if (loading) return <LoadingScreen />;
    if (error) return <LoadingScreen />;

    return (
      <>
  <Grid container spacing={2} xs={12}>
  <Grid key={0} item xs={12}>
 <H5 title="Zoek op producten"/>
<Autocomplete
multiple
id="tags-standard"
options={data && data.searchProduct  && data.searchProduct.map((option) => (option))}
getOptionLabel={(option) => option? option.name : ""}
onChange={(event,  values: searchProduct_searchProduct[]) => {setFieldValue("products", values.map((option) => option.id))}
}
renderInput={(params) => (
                 <TextField
                //  onKeyPress= {(e) => {
                //   if (e.key === 'Enter') {
                //   refetch({productname: productname})
                // }
                // }} 
                 {...params}
                //  onChange={(e) => setProductname(e.target.value)}
                 fullWidth
                label="Producten"
                />
  )}
  />
  <AutoSubmitToken />
  </Grid>
    </Grid>
    </>
    )
  }