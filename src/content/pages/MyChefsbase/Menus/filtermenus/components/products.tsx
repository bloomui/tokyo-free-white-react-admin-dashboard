import { Grid, Table, TableRow, TableCell, TextField, Typography, MenuItem } from "@material-ui/core"
import Autocomplete from "@material-ui/lab/Autocomplete"
import React, { useEffect, useState } from "react"
import { LoadingScreen } from "src/components/layout"
import { H5 } from "src/content/pages/Components/TextTypes"
import { AutoSubmitToken } from ".."
import { useSearchProductFilterQuery } from "../../../Ingredients/AddIngredient/api"
import { searchProduct_searchProduct } from "../../../Ingredients/AddIngredient/types/searchProduct"
import { DataGrid, GridColumns, GridRowsProp } from '@mui/x-data-grid';
import { FormikSelect } from "src/components/form/FormikSelect"

export const FilterProducts = ({
  setFieldValue
}: {
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
})  => {
  const [productname, setProductname] = useState('')

  const { data, loading, error, refetch } = useSearchProductFilterQuery({productname: productname})
  
  const [timer, setTimer] = useState(null);

  const [products, setProducts] = React.useState<searchProduct_searchProduct[]>([]);

function changeDelay(change) {
  if (timer) {
    clearTimeout(timer);
    setTimer(null);
  }
  setTimer(
    setTimeout(() => {
      setProductname(change);
      refetch({productname: productname})
    }, 100)
  );
}
if (loading) return (
  <TableCell>-
            </TableCell>
  ); else return (
                <TableCell>
                <Autocomplete
                options={data && data.searchProduct  && data.searchProduct.map((option) => (option))}
                onChange={(event: any, newValue: searchProduct_searchProduct) => {setProducts([...products, newValue])
                }}
        id="select-on-focus"
        selectOnFocus
        renderInput={(params) => (
          <TextField                  
          onChange={(e) => { changeDelay(e.target.value); }}
          {...params} 
          label="Producten" 
          variant="standard" />
        )}
      />
        <AutoSubmitToken />
                </TableCell>
  )  
}


export const Products = ({
    setFieldValue
  }: {
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
  }) => {
    const [productname, setProductname] = useState('')

    const { data, loading, error, refetch } = useSearchProductFilterQuery({productname: productname})
    
    const [timer, setTimer] = useState(null);

function changeDelay(change) {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
    setTimer(
      setTimeout(() => {
        setProductname(change);
        refetch({productname: productname})
      }, 200)
    );
}
    return (
      <>
  <Grid container spacing={2} xs={12}>
  <Grid key={0} item xs={12}>
 <H5 title="Zoek op producten"/>
<Autocomplete
multiple
id="tags-standard"
options={loading? [] : data && data.searchProduct  && data.searchProduct.map((option) => (option))}
getOptionLabel={(option) => option? option.name : ""}
onChange={(event,  values: searchProduct_searchProduct[]) => {setFieldValue("products", values.map((option) => option.id))}
}
renderInput={(params) => (
                 <TextField 
                placeholder={productname}
                 {...params}
                 onChange={(e) => { changeDelay(e.target.value); }}
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