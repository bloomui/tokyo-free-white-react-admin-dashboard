import React from "react"
import { BiSearchAlt2 } from "react-icons/bi"
import { BlackColor } from "../layout/Colors"
import { TextField, Box, Grid, InputBase, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { Loader } from "./Loader"

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

export const SearchDirect = ({
  placeholder, 
  value, 
  onChange, 
  isLoading
}: {
  value: string,
  placeholder: string, 
  onChange: (e: string) => void, 
  isLoading: boolean
}) => {

  return (
    <Box
    display="flex"
    width="400px"
    alignItems="center"
    flexDirection="column"
    >
    <TextField
    fullWidth
    placeholder={placeholder}
    onChange={(e) => onChange(e.target.value)}
    InputProps={{
    startAdornment:
    (
    <InputAdornment position="start">
    <SearchIcon/>
    </InputAdornment>
        ),
    }}>
    {value}
    </TextField>
    <Loader
    loading={isLoading}
    />
    </Box>
  )
  }