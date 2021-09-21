import { Grid, TextField, Typography } from "@material-ui/core"
import Autocomplete from "@material-ui/lab/Autocomplete"
import React from "react"
import { Dishes_menus } from "../../../Dishes/types/Dishes"
import { Menus_dishes } from "../../types/Menus"

export const Menus = ({
    menus,
    setFieldValue
  }: {
    menus: Dishes_menus[] | null;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
  }) => {
    return (
      <>
  <Grid container spacing={2} xs={12}>
 <Grid key={0} item>
   <Typography>Zoek op menu's:</Typography>
   {menus && (
    <Autocomplete
multiple
id="tags-standard"
options={menus.map((option) => (option))}
getOptionLabel={(option) => option? option.name : ""}
onChange={(event,  values: Dishes_menus[]) => setFieldValue("menus", values.map((option) => option.id))}
renderInput={(params) => (
                 <TextField
                 {...params}
                 fullWidth
                label="Menu's"
                />
  )}
  />
   )}

  </Grid>
    </Grid>
    </>
    )
  }