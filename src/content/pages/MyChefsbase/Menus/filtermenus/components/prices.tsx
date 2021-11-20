import { Grid, TextField, Typography } from "@material-ui/core"
import Autocomplete from "@material-ui/lab/Autocomplete"
import React from "react"
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const marks = [
  {
    value: 0.0,
    label: '€0,00',
  },
  {
    value: 25.0,
    label: '€25,00',
  },
  {
    value: 50.0,
    label: '€50,00',
  },
  {
    value: 75.0,
    label: '€75,00',
  },
  {
    value: 100.0,
    label: '€100,00',
  },
];

function valuetext(value: number) {
  return `€${value}`;
}

export const Price = ({
  setFieldValue
}: {
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
}) => {
  const [value, setValue] = React.useState<number>(0.0);
  
    const handleChange = (event: Event, newValue: number | number[]) => {
      setValue(newValue as number);
      setFieldValue("input.price", newValue);
    };
  return (
    <>
<Box >
      <Slider
        aria-label="Prijs"
        defaultValue={0.0}
        getAriaValueText={valuetext}
        step={0.01}
        marks={marks}
        valueLabelDisplay="on"
        onChange={handleChange}
      />
    </Box>
</>
  )
  }  
export const PriceRange = ({
  setFieldValue
}: {
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
}) => {
  const [value, setValue] = React.useState<number[]>([0.0, 0.0]);
  
    const handleChange = (event: Event, newValue: number | number[]) => {
      setValue(newValue as number[]);
      setFieldValue("minPrice", newValue[0]);
      setFieldValue("maxPrice", newValue[1])
    };
  return (
    <>
    <Box sx={{ width: 300 }}>
        <Slider
          getAriaLabel={() => 'Prijs range'}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
        />
      </Box>
    </>
  )
}

export const Prices = ({
    setFieldValue
  }: {
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
  }) => {
    return (
      <>
      <Grid container spacing={2} xs={12}>
      <Grid item>
    <Typography >Minimum en maximum prijs:</Typography>
    </Grid>
    </Grid>
    <Grid container spacing={2} xs={12}>
    <Grid key={0} item>
 <TextField
      fullWidth
      placeholder="Minimum prijs"
      onChange={(e) => setFieldValue("minPrice", e.target.value)}
    />
    </Grid>
    <Grid key={1} item>
 <TextField
      fullWidth
      placeholder="Maximale prijs"
      onChange={(e) => setFieldValue("maxPrice", e.target.value)}
    />
    </Grid>
    </Grid>
    </>
    )
  }