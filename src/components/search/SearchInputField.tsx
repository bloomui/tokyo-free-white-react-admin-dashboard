import { Grid, InputBase } from "@material-ui/core"
import React from "react"
import { BiSearchAlt2 } from "react-icons/bi"
import { BlackColor } from "../layout/Colors"

export const SearchInputField = ({ name, handleSubmit, handleChange }: { name: string, handleSubmit: () => void, handleChange: () => void }) => {
    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={1}>
                  <Grid key={0} item>
                  <BiSearchAlt2 color={BlackColor}/>
                  </Grid>
                  <Grid key={1} item>
                  <InputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              type="text"
            onChange={handleChange}
            value={name}
            />
            </Grid>
              </Grid>
            </form>
    )
}