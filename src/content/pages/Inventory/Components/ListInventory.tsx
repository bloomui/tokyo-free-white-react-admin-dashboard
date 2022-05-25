import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, Grid, Button, Dialog, TextField } from "@material-ui/core";
import { Formik } from "formik";
import React, { useState } from "react";
import { VscTrash } from "react-icons/vsc";
import { H5 } from "../../Components/TextTypes";
import { InventoryFormToNumber } from "./Constants";
import { OrderTable } from "./OrderTable";
import { TableInventoryData } from "./TableInventoryData";

export const ListInventory  = () => {
  
    const [selectedIngredients, setIngredients] = React.useState<InventoryFormToNumber[]>([]);
    
    function handleDelete(index) {
        selectedIngredients.splice(index, 1)
        setIngredients([...selectedIngredients])
    }
  
    return (
        <Grid container xs={12}>
            <Grid xs={6}>
            <TableInventoryData 
                setIngredient={(selected) =>
                    setIngredients([...selectedIngredients, selected])}
                />
            </Grid>
            <Grid xs={1}></Grid>
            <Grid xs={5}>
                <OrderTable handleDelete={(index) => handleDelete(index)} ingredients={selectedIngredients}/>
            </Grid>
            <Grid xs={6}>
            </Grid>
            <Grid xs={6}>
            </Grid>
            </Grid>
    )
  }


  