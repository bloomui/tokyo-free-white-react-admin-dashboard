import { Grid, TextField, Typography } from "@material-ui/core"
import Autocomplete from "@material-ui/lab/Autocomplete"
import React from "react"
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const marks = [
  {
    value: 0.0,
    label: '0,00',
  },
  {
    value: 250.0,
    label: '250,00',
  },
  {
    value: 500.0,
    label: '500,00',
  },
  {
    value: 750.0,
    label: '750,00',
  },
  {
    value: 1000.0,
    label: '1000,00',
  },
];

function valuetext(value: number) {
  return `${value}`;
}

export const Quantity = ({
  name,
  setFieldValue
}: {
  name: string;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
}) => {
  const [value, setValue] = React.useState<number>(0.0);
  
    const handleChange = (event: Event, newValue: number | number[]) => {
      setValue(newValue as number);
      setFieldValue(name, newValue);
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