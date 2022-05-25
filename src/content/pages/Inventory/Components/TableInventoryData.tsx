import { TableContainer, Paper, Table, TableRow, Grid, Typography, TextField, TableCell, Button } from "@material-ui/core";
import { Formik } from "formik";
import { useState } from "react";
import { FormFieldEdit } from "src/components/form/FormField";
import { LoadingScreen } from "src/components/layout";
import { composeValidators, required, mustBeNumber } from "src/utilities/formikValidators";
import { useInventoryQuery } from "../api";
import { listInventory_listInventory } from "../types/listInventory";
import { AddToInventory } from "./AddInventory";
import { InventoryFormToNumber } from "./Constants";

export const TableInventoryData = ({
    setIngredient
  }: {
    setIngredient: (selected: InventoryFormToNumber) => void
  }) => {
  
    const [name, setName] = useState<string>()
    const [openAdd, setOpenAdd] = useState(false)
  
    const { loading, data, error, refetch } = useInventoryQuery()
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
            <TableCell>Ingredient</TableCell>
            <TableCell>Merk</TableCell>
            <TableCell>Per</TableCell>
            <TableCell>Prijs</TableCell>
            <TableCell>Aantal</TableCell>
          </TableRow>
          {data.listInventory.map((inventory) => (
            <Row 
            data={inventory}
            setIngredient={(a: InventoryFormToNumber) => setIngredient(a)}/>
          ))}
          <TableRow>
            <TableCell align="center" colSpan={5}>
            <Button variant="outlined" onClick={() => setOpenAdd(true)}>Ingredienten toevoegen aan inventaris</Button>
          </TableCell></TableRow>
          </Table>
          <AddToInventory open={openAdd} onClose={() => setOpenAdd(false)}/>
          </TableContainer>
    )
  }
  const Row = ({data, setIngredient}: {data: listInventory_listInventory, setIngredient: (a) => void}) => {

    const formState: InventoryFormToNumber = {
      form: {
      ingredientid: data.ingredient.id,
      ingredientname: data.ingredient.name,
      quantity: String(data.quantity.quantity),
      unit: data.quantity.unit,
      brand: data.brand,
      price: String(data.price),
      expiration: data.expiration,
      rating: '',
      origin: ''
  },
    number: 1
}

    return (
      <Formik
          initialValues={formState}
          onSubmit={(values) => {
            setIngredient(values);
          }}
        >
          {({ setFieldValue, submitForm }) => {
        return (
          <>
          <TableRow >
            <TableCell >
              {data.ingredient.name}
            </TableCell>
            <TableCell >
              {data.brand}
            </TableCell>
            <TableCell align="left">{data.quantity.quantity} {data.quantity.unit}</TableCell>
            <TableCell align="left">€{data.price.toFixed(2)}</TableCell>
            <TableCell>
              <FormFieldEdit 
              placeholder="1"
              name="number"
              label=""
              validator={composeValidators(required, mustBeNumber)}
              />
            </TableCell>
            <TableCell >
              <Button
                    onClick={() => {submitForm()}}
                    color="primary"
                    variant="outlined"
                  >
                    +
                  </Button>
            </TableCell>
          </TableRow>
        </>
        )
          }
        }
        </Formik>
    )
  }
  