import { TableContainer, Table, TableHead, TableRow, TableCell, TextField, Button, Dialog, DialogContent, DialogTitle, Grid, Paper } from "@material-ui/core"
import { Formik } from "formik"
import { useState } from "react"
import { VscCheck, VscTrash } from "react-icons/vsc"
import { H5 } from "../../Components/TextTypes"
import { InventoryFormToNumber } from "./Constants"

export const OrderTable = ({handleDelete, ingredients}: {handleDelete: (index) => void; ingredients: InventoryFormToNumber[]}) => {

    const [ordered, setOrdered] = useState(false)
    const totalPrice = (ingredients: InventoryFormToNumber[]) => ingredients.map((ingredientFormToNumber) => {
        console.log(ingredientFormToNumber)
    return (
        Number(ingredientFormToNumber.form.price) * ingredientFormToNumber.number
    )
}
    ).reduce((partialSum, a) => partialSum + a, 0)
  
    const initialValues = {
        a: ingredients
    }
   return (
        <Formik
        initialValues={initialValues}
        onSubmit={(values) => {}
        }
            >
                 {({ values, setFieldValue, submitForm }) => {
                     console.log(values)
        return (
          <>
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                            <TableCell align="center"><H5 title="Ingredient:"/></TableCell>
                            <TableCell align="center"><H5 title="Merk:"/></TableCell>
                            <TableCell align="center" colSpan={2}><H5 title="Hoeveelheid:"/></TableCell>
                            <TableCell align="center"><H5 title="Prijs"/></TableCell>
                            <TableCell align="center"></TableCell>
                    </TableRow>
                </TableHead>
                {ingredients.map((ingredient, index) => (
                    <TableRow>
                    <TableCell align="center">
                    {ingredient.form.ingredientname}
                    </TableCell>
                    <TableCell align="center">
                        {ingredient.form.brand}
                    </TableCell>
                    <TableCell colSpan={2} align="center">
                    <TextField
                    onKeyPress= {(e) => {
                        if (e.key === 'Enter') {
                        submitForm()
                      }
                      }}  
        fullWidth
        defaultValue={Number(ingredient.form.quantity) * ingredient.number}
        onChange={(e) => {
            setFieldValue(`a.${index}.number`, (Number(e.target.value)/Number(ingredient.form.quantity)));
            setFieldValue(`a.${index}.form.price`, Number(ingredient.form.price))}
        }
      />             
      {ingredient.form.unit}    
                    </TableCell>
                    <TableCell align="center">
                        {`€${values.a[index]?.number ? (values.a[index].number * Number(ingredient.form.price)).toFixed(2) : (ingredient.number * Number(ingredient.form.price)).toFixed(2)}`}
                    </TableCell>
                    <TableCell><VscTrash style={{ cursor: 'pointer'}}  onClick={() => handleDelete(index)}/></TableCell>
                </TableRow>
                ))}
                <TableRow>
                <TableCell>
                <H5 title="Totaal bedrag"/>
                    </TableCell>
                    <TableCell>
                    </TableCell>
                    <TableCell>
                    </TableCell>
                    <TableCell>
                    </TableCell>
                    <TableCell>
                        <H5 title={`€${totalPrice(values.a).toFixed(2)}`} />
                    </TableCell>
                </TableRow>
                <TableRow>
            <TableCell align="center" colSpan={5}>
            <Button onClick={() => setOrdered(true)} variant="outlined">Bestelling plaatsen</Button>
          </TableCell></TableRow>
            </Table>
        </TableContainer>
            <Dialog open={ordered} onClose={() => setOrdered(false)}>
                <DialogTitle><Grid container xs={12}>
                    <Grid xs={3}></Grid>
                    <Grid xs={5}><H5 title="Bestelling geplaatst"/></Grid>
                    <Grid xs={2}> <VscCheck/></Grid>
                    </Grid></DialogTitle>
                <DialogContent>
                <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                            <TableCell align="center"><H5 title="Ingredient:"/></TableCell>
                            <TableCell align="center"><H5 title="Merk:"/></TableCell>
                            <TableCell align="center" ><H5 title="Hoeveelheid:"/></TableCell>
                            <TableCell align="center"><H5 title="Prijs"/></TableCell>
                    </TableRow>
                </TableHead>
                {ingredients.map((ingredient, index) => (
                    <TableRow>
                    <TableCell align="center">
                    {ingredient.form.ingredientname}
                    </TableCell>
                    <TableCell align="center">
                        {ingredient.form.brand}
                    </TableCell>
                    <TableCell align="center">
                        {ingredient.form.quantity} {ingredient.form.unit} 
                    </TableCell>
                    
                    <TableCell align="center">
                        {`€${values.a[index]?.number ? (values.a[index].number * Number(ingredient.form.price)).toFixed(2) : (ingredient.number * Number(ingredient.form.price)).toFixed(2)}`}
                    </TableCell>
                </TableRow>
                ))}
                <TableRow>
                <TableCell>
                <H5 title="Totaal bedrag"/>
                    </TableCell>
                    <TableCell>
                    </TableCell>
                    <TableCell>
                    </TableCell>
                    <TableCell>
                        <H5 title={`€${totalPrice(values.a).toFixed(2)}`} />
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan={4} align="center"><Button variant="outlined" onClick={() => setOrdered(false)}>Sluiten</Button></TableCell>
                </TableRow>
                </Table>
               </TableContainer>
                </DialogContent>
                </Dialog>
        </>
        )
                }}
        </Formik>
    )
  }