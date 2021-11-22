import { Box, Grid, Typography } from "@material-ui/core";
import React from "react"
import Rating from '@material-ui/lab/Rating';
import { TextField } from "@material-ui/core";
import { H5 } from "src/content/pages/Components/TextTypes";

export const RatingLabels: { [index: string]: string } = {
    0: 'Minimaal',
    1: 'Laag',
    2: 'Onvoldoende+',
    3: 'Voldoende',
    4: 'Goed',
    5: 'Excellent',
  };
  

export const RatingEdit = ({
  updateField,
  defaultNumber,
  setFieldValue
}: {
  updateField: string,
  defaultNumber: number,
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
}) => {
  const [value, setValue] = React.useState<number | null>(defaultNumber);
  const [hover, setHover] = React.useState(-1);
  return (
    <>
    <Grid container spacing={2} xs={12}>
    <Grid key={0} item xs={12}>
    <H5 title="Beoordeling"/>
  </Grid>
  </Grid>
  <Grid container spacing={2} xs={12}>
  <Grid key={0} item xs={12}>
    <Rating
      name="hover-feedback"
      value={value}
      precision={1}
      onChange={(event,  value) => {
          setValue(value)
          setFieldValue(updateField, value)
      }}
      onChangeActive={(event, newHover) => {
        setHover(newHover);
      }}
    />
    {value !== null && <Box ml={2}>{RatingLabels[hover !== -1 ? hover : value]}</Box>}
  </Grid>
  </Grid>
  </>
  )
}


export const Rating1 = ({
    updateField,
    setFieldValue
  }: {
    updateField: string,
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
  }) => {
    const [value, setValue] = React.useState<number | null>(2);
    const [hover, setHover] = React.useState(-1);
    return (
      <>
      <Grid container spacing={2} xs={12}>
      <Grid item>
      <H5 title="Beoordeling"/>
    </Grid>
    </Grid>
    <Grid container spacing={2} xs={12}>
    <Grid key={0} item>
      <Rating
        name="hover-feedback"
        value={value}
        precision={1}
        onChange={(event,  value) => {
            setValue(value)
            setFieldValue(updateField, value)
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
      />
      {value !== null && <Box ml={2}>{RatingLabels[hover !== -1 ? hover : value]}</Box>}
    </Grid>
    </Grid>
    </>
    )
  }

  export const Comment = ({
    setFieldValue
  }: {
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
  }) => {
    return (
      <>
      <Grid container spacing={2} xs={12}>
      <Grid item>
    <Typography >Opmerking:</Typography>
    </Grid>
    </Grid>
    <Grid container spacing={2} xs={12}>
    <Grid key={0} item>
      <TextField
        fullWidth
        placeholder="opmerking"
        onChange={(e) => setFieldValue("comment", e.target.value)}
      />
      </Grid>
    </Grid>
    </>
    )
  }