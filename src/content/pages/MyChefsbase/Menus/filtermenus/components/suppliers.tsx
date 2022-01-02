import { Grid, TextField, Typography } from "@material-ui/core"
import Autocomplete from "@material-ui/lab/Autocomplete"
import React, { useState } from "react"
import { H5 } from "src/content/pages/Components/TextTypes"
import { AutoSubmitToken } from ".."
import { useSearchSupplierFilterQuery } from "./api"
import { searchSupplier_searchSupplier } from "./types/searchSupplier"

export const Suppliers = ({
    setFieldValue
  }: {
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
  }) => {
    const [name, setName] = useState('')

    const { data, loading, error, refetch } = useSearchSupplierFilterQuery({name: name})
    
    const [timer, setTimer] = useState(null);

function changeDelay(change) {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
    setTimer(
      setTimeout(() => {
        setName(change);
        refetch({suppliername: name})
      }, 200)
    );
}
    return (
      <>
  <Grid container spacing={2} xs={12}>
  <Grid key={0} item xs={12}>
 <H5 title="Zoek op leveranciers"/>
<Autocomplete
multiple
id="tags-standard"
options={loading? [] : data && data.searchSupplier  && data.searchSupplier.map((option) => (option))}
getOptionLabel={(option) => option? option.name : ""}
onChange={(event,  values: searchSupplier_searchSupplier[]) => {setFieldValue("suppliers", values.map((option) => option.id))}
}
renderInput={(params) => (
                 <TextField 
                placeholder={name}
                 {...params}
                 onChange={(e) => { changeDelay(e.target.value); }}
                 fullWidth
                label="Leveranciers"
                />
  )}
  />
  <AutoSubmitToken />
  </Grid>
    </Grid>
    </>
    )
  }