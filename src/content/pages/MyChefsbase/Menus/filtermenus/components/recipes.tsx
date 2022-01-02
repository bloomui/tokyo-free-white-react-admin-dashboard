import { Grid, TextField, Typography } from "@material-ui/core"
import Autocomplete from "@material-ui/lab/Autocomplete"
import React, { useState } from "react"
import { H5 } from "src/content/pages/Components/TextTypes"
import { AutoSubmitToken } from ".."
import { useSearchRecipeFilterQuery } from "./api"
import { searchRecipe_searchRecipe } from "./types/searchRecipe"

export const Recipes = ({
    setFieldValue
  }: {
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
  }) => {
    const [name, setName] = useState('')

    const { data, loading, error, refetch } = useSearchRecipeFilterQuery({name: name})
    
    const [timer, setTimer] = useState(null);

function changeDelay(change) {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
    setTimer(
      setTimeout(() => {
        setName(change);
        refetch({recipename: name})
      }, 200)
    );
}
    return (
      <>
  <Grid container spacing={2} xs={12}>
  <Grid key={0} item xs={12}>
 <H5 title="Zoek op recepten"/>
<Autocomplete
multiple
id="tags-standard"
options={loading? [] : data && data.searchRecipe  && data.searchRecipe.map((option) => (option))}
getOptionLabel={(option) => option? option.name : ""}
onChange={(event,  values: searchRecipe_searchRecipe[]) => {setFieldValue("recipes", values.map((option) => option.id))}
}
renderInput={(params) => (
                 <TextField 
                placeholder={name}
                 {...params}
                 onChange={(e) => { changeDelay(e.target.value); }}
                 fullWidth
                label="Recepten"
                />
  )}
  />
  <AutoSubmitToken />
  </Grid>
    </Grid>
    </>
    )
  }