import { Dialog, DialogTitle, DialogContent, Card, CardActionArea, Grid, Typography, TableContainer, TableBody, TableCell, TableHead, TableRow, List, ListItem, Button, DialogActions } from "@material-ui/core"
import React, { useState } from "react"
import { LoadingScreen } from "src/components/layout"
import { FormField } from "src/content/pages/SignIn"
import { composeValidators, required } from "src/utilities/formikValidators"
import { FilterDishes_filterDishes_method, FilterDishes_filterDishes_recipes } from "../../Dishes/types/FilterDishes"
import { ItemString, ItemInt } from "../../Menus/menuDialog"
import { useGetSupplierQuery } from "../api"
import { UpdateSupplierDialog } from "./updateSupplierDialog"

export const SupplierDialog = ({
    setId,
    id,
    open,
    onClose,
}: {
    id: string;
    setId: () => void;
    open: boolean;
    onClose: () => void
}) => {

    const { data, loading, error } = useGetSupplierQuery(id)

    const [openUpdateDialog, setUpdateDialog] = useState(false)

    if (loading) return <LoadingScreen/>
    if (error) return <LoadingScreen/>

    let supplier = data.supplier

    return (
        <>
        <Dialog open={open} onClose={onClose}>
            {supplier && (
             <>
                <DialogTitle style={{ fontWeight: 600 }} id="form-dialog-title">Levverancier: {supplier.name}</DialogTitle>
                <DialogActions>
                <Button variant="contained" onClick={onClose}>
                  Terug
                </Button>
                <Button variant="contained" onClick={() => {
                        setId();
                        setUpdateDialog(true);
                        onClose()
                }}>
                  Leverancier aanpassen
                </Button>
              </DialogActions>
              <DialogContent>
                  <Card>
                      <Grid container spacing={2} xs={12}>
                       <ItemInt 
                       title="rating"
                       item={supplier.rating}
                       />
                       <ItemString
                       title="Email"
                       item={supplier.email}
                       />
                      </Grid>
                  </Card>
              </DialogContent>
            </>
            )}
        </Dialog>
        <UpdateSupplierDialog
        supplier={supplier}
        open={openUpdateDialog}
        onClose={() => setUpdateDialog(false)}
        />
        </>
    )
}