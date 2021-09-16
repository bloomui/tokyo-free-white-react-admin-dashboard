import {
    Button,
    Dialog,
    DialogContent,
    Grid,
      Paper,
      Table,
      TableBody,
      TableCell,
      TableContainer,
      TableHead,
      TablePagination,
      TableRow,
      Typography,
    } from "@material-ui/core";
    import React, { useState } from "react";
  import StarRateTwoToneIcon from '@material-ui/icons/StarRateTwoTone';
  import { VscStarFull, VscStarEmpty, VscTrash, VscAdd, VscSearch, VscEdit } from "react-icons/vsc";
  import { useMutation } from "@apollo/client";
import { Dishes } from "./types/Dishes";
import { DishDialog } from "./dishDialogs";
import { UpdateDishDialog } from "./dishDialogs/UpdateDish";
import { AddDishDialog } from "./dishDialogs/AddDishDialog";
import { useAddToFavorites } from "../Menus/api";
import { LightGreenColor } from "src/components/layout/Colors";
import { KitchenType } from "src/globalTypes";
import { AreYouSureDelete } from "../Menus/MenuTable";

export const DishTable = ({
    data, 
    page, 
    setPage,
  }: {
    data: Dishes; 
    page: number; 
    setPage: (newPage: number) => void;
    }) => {
    
    const [pageNumber, setPageNumber] = React.useState(0);
  
    const handleChangePage = (
      event: any,
      newPage: React.SetStateAction<number>
    ) => {
      setPage(newPage as number);
    };
  
    const [open, setOpen] = React.useState(false);
    const [openUpdate, setOpenUpdate] = React.useState(false)
    const [openAddDish, setOpenAddDish] = useState(false)
    const [areYouSureDelete, setAreYouSureDelete] = useState<boolean>(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPageNumber(0);
    };
    const { add } = useAddToFavorites({
      onCompleted: () => window.location.reload(),
    });
    
    return (
        <>
                <TableContainer component={Paper}>
                <Button color="secondary" variant="contained" onClick={() => setOpenAddDish(true)}>
                    <Grid 
                    onClick={() => setOpenAddDish(true)}
                    container xs={12}>
                      <Grid item xs={12}>
                      <span><VscAdd /> Nieuw Gerecht</span>
                      </Grid>
                      </Grid> 
                  </Button>
              <Table >
              <TableHead>
              <TableRow>
                <TableCell>Gerecht naam</TableCell>
                <TableCell align="center">Thema</TableCell>
                <TableCell align="center">Opmerking</TableCell>
                <TableCell align="center">rating</TableCell>
                <TableCell align="center">Acties</TableCell>
              </TableRow>
              </TableHead>
            <TableBody>
            {data && data.filterDishes && data.filterDishes.map((dish) => (
              dish? (
                <>
              <TableRow>
                <TableCell 
                style={{ cursor: 'pointer' }}
                onClick={() => setOpen(true)}
                >{dish.name}</TableCell>
                <TableCell align="center">{dish.theme}</TableCell>
                <TableCell align="center">{dish.comment}</TableCell>
                <TableCell align="center">{dish.rating}</TableCell>
                <TableCell 
                align="center"
                >
                  <>
                  <Grid container xs={12}>
                    <Grid item xs={4}>
                  <VscEdit  
                  onClick={() => setOpenUpdate(true)}
                  style={{ cursor: 'pointer' }}/>
                  </Grid>
                  <Grid item xs={4}>
                  <VscTrash 
                  onClick={() => setAreYouSureDelete(true)}
                  style={{ cursor: 'pointer' }}/>
                  </Grid>
                  <Grid item xs={4}>
                  <VscStarEmpty onClick={() => {
                    add({variables: {
                      id: dish.id,
                      kitchenType: KitchenType.Dish
                    }});
                  }
                }
                  style={{ cursor: 'pointer' }}/>
                  </Grid>
                  </Grid>
                  </>
                </TableCell>
              </TableRow>
              <DishDialog
              setOpenUpdateDialog={() => setOpenUpdate(true)}
              dish={dish}
              open={open}
              onClose={() => setOpen(false)}
              />
              <UpdateDishDialog 
                allRecipes={data.recipes}
                 dish={dish}
                 open={openUpdate}
                 onClose={() => setOpenUpdate(false)}
                 />
                 <AreYouSureDelete
                 open={areYouSureDelete}
                 id={dish.id}
                 kitchenType={KitchenType.Dish}
                 onClose={() => setAreYouSureDelete(false)}
                 />
              </>
            ): <TableRow>
              Geen menu's beschikbaar
            </TableRow>
            ))}
            </TableBody>
            <AddDishDialog 
                allRecipes={data.recipes}
                 open={openAddDish}
                 onClose={() => setOpenAddDish(false)}
                 />
                   </Table>
                   </TableContainer>
                   <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={data? (data.filterDishes? (data.filterDishes.length) : 1000) : 1000}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
                </>
    )
  }