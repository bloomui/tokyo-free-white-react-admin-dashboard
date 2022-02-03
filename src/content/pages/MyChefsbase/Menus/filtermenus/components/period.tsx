import { Grid, Typography } from "@material-ui/core"
import Autocomplete from "@material-ui/lab/Autocomplete"
import React, { useState } from "react"
import { H5 } from "src/content/pages/Components/TextTypes"
import "react-datepicker/dist/react-datepicker.css";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';

// export const Period = ({
//     setFieldValue
//   }: {
//     setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
//   }) => {
//     const [startDate, setStartDate] = useState(new Date());
//     const [endDate, setEndDate] = useState(new Date());

//     return (
//       <>
//       <Grid container spacing={2} xs={12}>
//       <Grid item xs={12}>
//     <H5 title="Zoek op periode"/>
//     </Grid>
//     <Grid item xs={5}>
//     <DatePicker selected={startDate} onChange={(date) => setFieldValue("periodstartdate", String(date))} />
//       </Grid>
//           <Grid item xs={2}></Grid>
//       <Grid item xs={5}>
//     <DatePicker selected={endDate} onChange={(date) => setFieldValue("periodenddate", String(date))} />
//       </Grid>
//     </Grid>
//     </>
//     )
//   }

  export const InsertPeriod = ({
    setFieldValue
  }: {
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
  }) => {
    const [startDate, setStartDate] = useState<Date>(null);
    const [endDate, setEndDate] = useState<Date>(null);

    return (
      <>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
    <DatePicker
        label="Startdatum"
        value={startDate}
        onChange={(date) => {
          setStartDate(date);
          setFieldValue("periodstartdate", convertDate(String(date)))}
        }
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
          <Grid item xs={2}></Grid>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
    <DatePicker
        label="Einddatum"
        value={endDate}
        onChange={(date) => {
          setEndDate(date);
          setFieldValue("periodenddate", convertDate(String(date)))}
        }
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
    </>
    )
  }

  export const InputPeriod = ({
    setFieldValue
  }: {
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
  }) => {
    const [startDate, setStartDate] = useState<Date>(null);
    const [endDate, setEndDate] = useState<Date>(null);

    return (
      <>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
    <DatePicker
        label="Startdatum"
        value={startDate}
        onChange={(date) => {
          setStartDate(date);
          setFieldValue("input.periodstartdate", convertDate(String(date)))}
        }
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
          <Grid item xs={2}></Grid>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
    <DatePicker
        label="Einddatum"
        value={endDate}
        onChange={(date) => {
          setEndDate(date);
          setFieldValue("input.periodenddate", convertDate(String(date)))}
        }
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
    </>
    )
  }

  function convertDate(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }