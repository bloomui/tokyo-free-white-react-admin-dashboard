import { Grid, TextField } from "@material-ui/core"
import React from "react"
import { H5 } from "../../Components/TextTypes"
import Autocomplete from "@material-ui/lab/Autocomplete"

export const DefaultNutritionOptions = [
    "Totale kalorieën",
    "Totale vetten",
    "Suikers",
    "Koolhydraten totaal",
    "Eiwitten totaal",
    "Vezels",
    "Totale vitaminen",
    "Zout",
    "Cholesterol",
]

export const NutritionOptions = [
    "Totale kalorieën",
    "Totale vetten",
    "Verzadigde vetten",
    "Onverzadigde vetten",
    "Suikers",
    "Koolhydraten totaal",
    "Eiwitten totaal",
    "Dierlijke eiwitten",
    "Plantaardige eiwitten",
    "Vezels",
    "Totale vitaminen",
    "Vitamine C",
    "Vitamine E",
    "Vitamine K",
    "Vitamine B12",
    "Zetmeel",
    "Zout",
    "Cholesterol",
    "Kalk",
    "Fosfor",
    "Natrium",
    "Kalium",
    "Water",
    "Koper",
    "Ijzer",
    "Nitrogen",
    "Jodium",
    "Zink",
    "Magnesium"
]

export const NutritionOptionDropDown = ({
    setFieldValue,
}: {
    setFieldValue: (selected: string[]) => void}) => {
    return (
        <>
        <Grid container xs={12}>
    <Grid item xs={12}>
  <H5 title="Kies voedingswaarden om weer te geven" />
  </Grid>
  <Grid item xs={12}>
    <Autocomplete
        multiple
        id="tags-standard"
        options={NutritionOptions.map((option) => (option))}
    getOptionLabel={(option) => option}
    onChange={(event,  values: string[]) => setFieldValue(values.map((option) => option))}
    renderInput={(params) => (
                 <TextField
                 {...params}
                 fullWidth
                    label="Voedingswaarden"
                />
    )}
    /> 
    </Grid>
    </Grid>
    </>
    )
  }