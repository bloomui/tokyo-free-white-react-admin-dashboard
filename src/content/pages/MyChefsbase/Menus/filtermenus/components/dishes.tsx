import { Grid, TextField, Typography } from "@material-ui/core"
import Autocomplete from "@material-ui/lab/Autocomplete"
import React, { useState } from "react"
import { H5 } from "src/content/pages/Components/TextTypes"
import { AutoSubmitToken } from ".."
import { useSearchDishFilterQuery } from "./api"
import { searchDish_searchDish } from "./types/searchDish"

export const Dishes = ({
    setFieldValue
  }: {
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
  }) => {
    
    const [name, setName] = useState('')
  
    const { data, loading, error, refetch } = useSearchDishFilterQuery({name: name})
    
    const [timer, setTimer] = useState(null);

function changeDelay(change) {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
    setTimer(
      setTimeout(() => {
        setName(change);
        refetch({dishname: name})
      }, 200)
    );
}
    return (
      <>
  <Grid container spacing={2} xs={12}>
  <Grid key={0} item xs={12}>
 <H5 title="Zoek op gerechten"/>
<Autocomplete
multiple
id="tags-standard"
options={loading? [] : data && data.searchDish && data.searchDish.map((option) => (option))}
getOptionLabel={(option) => option? option.name : ""}
onChange={(event,  values: searchDish_searchDish[]) => {setFieldValue("dishes", values.map((option) => option.id))}
}
renderInput={(params) => (
                 <TextField 
                placeholder={name}
                 {...params}
                 onChange={(e) => { changeDelay(e.target.value); }}
                 fullWidth
                label="Gerechten"
                />
  )}
  />
  <AutoSubmitToken />
  </Grid>
    </Grid>
    </>
    )
  }