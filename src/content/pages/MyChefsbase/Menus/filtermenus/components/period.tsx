import { Grid, TextField, Typography } from "@material-ui/core"
import Autocomplete from "@material-ui/lab/Autocomplete"
import React, { useState } from "react"
import { H5 } from "src/content/pages/Components/TextTypes"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const Period = ({
    setFieldValue
  }: {
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
  }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    return (
      <>
      <Grid container spacing={2} xs={12}>
      <Grid item xs={12}>
    <H5 title="Zoek op periode"/>
    </Grid>
    <Grid item xs={5}>
    <DatePicker selected={startDate} onChange={(date) => setFieldValue("periodstartdate", String(date))} />
      </Grid>
          <Grid item xs={2}></Grid>
      <Grid item xs={5}>
    <DatePicker selected={endDate} onChange={(date) => setFieldValue("periodenddate", String(date))} />
      </Grid>
    </Grid>
    </>
    )
  }