import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, Paper, Table, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, TextFieldProps } from "@material-ui/core";
import { Typography } from "@mui/material";
import { Formik, useField } from "formik";
import React, { useState } from "react";
import { FormikSelect } from "src/components/form/FormikSelect";
import { LoadingScreen } from "src/components/layout";
import { recipeToQ } from "..";
import { getAvailableUnits } from "../../../Recipes/recipeDialogs";
import { recipeRowsPerPage, useSearchRecipeQuery } from "../api";
import { recipes_recipes } from "../types/recipes";

export  const TableRecipeData = ({
  setRecipes
}: {
    setRecipes: (selected: recipeToQ) => void
}) => {
    const [pageNumber, setPageNumber] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const handleChangePage = (
        event: any,
        newPage: React.SetStateAction<number>
      ) => {
        setPage(newPage as number);
      };
      const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPageNumber(0);
        };

    const [name, setName] = useState<string>()

    const [page, setPage] = useState<number>(0)

  const { loading, data, error, refetch } = useSearchRecipeQuery({
    name: name,
    page: page
    });
  if (loading) return <LoadingScreen />;
  if (error) return <LoadingScreen />;

  return (
    <TableContainer component={Paper}>
          <Table size="small">
              <TableRow>
              <Grid container spacing={2} xs={12}>
 <Grid key={0} item>
   <Typography>Zoek op naam:</Typography> 
 <TextField
    onKeyPress= {(e) => {
        if (e.key === 'Enter') {
          console.log(e.key);
        refetch({name: name})
      }
      }}      
      fullWidth
      placeholder="Zoek op naam"
      onChange={(e) => setName(e.target.value)}    />
    </Grid>
    </Grid>
              </TableRow>
        <TableRow>
          <TableCell>Recept</TableCell>
          <TableCell>type</TableCell>
          <TableCell>Voeg toe</TableCell>
        </TableRow>
        {data.recipes.map((recipe) => (
          <Row 
          data={recipe}
          setRecipe={(a: recipeToQ) => setRecipes(a)}/>
        ))}
        </Table>
        <TablePagination
              rowsPerPageOptions={[10]}
              component={Paper}
              count={data.numberOfRecipes}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
      </TableContainer>
  )
}

const Row = ({data, setRecipe}: {data: recipes_recipes, setRecipe: (a) => void}) => {

  const formState: recipeToQ = {
  name: data.name,
  id: data.id,
  quantity: '',
  unit: ''
}
const  [open, setOpen] = useState<boolean>(false)

const unitsHere = getAvailableUnits(data.quantity.unit)

  return (
    <Formik
        initialValues={formState}
        onSubmit={(values) => {
          setRecipe(values);
        }}
      >
        {({ setFieldValue, submitForm }) => {
      return (
        <>
        <TableRow >
          <TableCell >
            {data.name}
          </TableCell>
          <TableCell >
            {data.type}
          </TableCell>
          <TableCell>
          <Button
                  onClick={() => {setOpen(true)}}
                  color="primary"
                  variant="outlined"
                >
                  +
                </Button>
          </TableCell>
        </TableRow>
        <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogActions>
                  <Grid xs={12}><Button
                  onClick={() => {setOpen(false)}}
                  color="primary"
                  variant="outlined"
                >
                  Terug</Button></Grid>
                </DialogActions>
              <DialogContent>
                <Table>
                  <TableHead>
                  <TableCell>Hoeveelheid</TableCell>
                  <TableCell>Eenheid</TableCell>
                    </TableHead>
                    <TableRow>
                      <TableCell>
                      <TextField
              variant="outlined" size="small"
              onChange={(e) => setFieldValue("quantity", e.target.value)}
              />
                      </TableCell>
                        <TableCell>
                        <FormikSelect
                      name="unit"
                      >
              {unitsHere.map((unit) => (
                <MenuItem key={unit} value={unit}>{unit}</MenuItem>
              ))}
            </FormikSelect>
                        </TableCell>
                        <TableCell>
                        <Button
                  onClick={() => {
                    submitForm();
                    setOpen(false)}}
                  color="primary"
                  variant="outlined">Voeg Toe</Button>
                        </TableCell>
                  </TableRow>
                  </Table>
                      <Grid container spacing={2} xs={12}>
              <Grid  item xs={6}>
              </Grid>
              <Grid  item xs={6}>
              
              </Grid>
               </Grid>
              </DialogContent>
        </Dialog>
      </>
      )
        }
      }
      </Formik>
  )
}
