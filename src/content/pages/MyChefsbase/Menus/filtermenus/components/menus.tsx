import { H5 } from "src/content/pages/Components/TextTypes"
import { Grid, TextField, Typography } from "@material-ui/core"
import Autocomplete from "@material-ui/lab/Autocomplete"
import React from "react"
import { useState } from "react"
import { AutoSubmitToken } from ".."
import { useSearchMenuFilterQuery } from "./api"
import { searchMenu_searchMenu } from "./types/searchMenu"

export const Menus = ({
    setFieldValue
  }: {
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
  }) => {
      const [name, setName] = useState('')
  
      const { data, loading, error, refetch } = useSearchMenuFilterQuery({name: name})
      
      const [timer, setTimer] = useState(null);
  
  function changeDelay(change) {
      if (timer) {
        clearTimeout(timer);
        setTimer(null);
      }
      setTimer(
        setTimeout(() => {
          setName(change);
          refetch({menuname: name})
        }, 200)
      );
  }
      return (
        <>
    <Grid container spacing={2} xs={12}>
    <Grid key={0} item xs={12}>
   <H5 title="Zoek op menus"/>
  <Autocomplete
  multiple
  id="tags-standard"
  options={loading? [] : data && data.searchMenu && data.searchMenu.map((option) => (option))}
  getOptionLabel={(option) => option? option.name : ""}
  onChange={(event,  values: searchMenu_searchMenu[]) => {setFieldValue("menus", values.map((option) => option.id))}
  }
  renderInput={(params) => (
                   <TextField 
                  placeholder={name}
                   {...params}
                   onChange={(e) => { changeDelay(e.target.value); }}
                   fullWidth
                  label="Menus"
                  />
    )}
    />
    <AutoSubmitToken />
    </Grid>
      </Grid>
      </>
      )
    }