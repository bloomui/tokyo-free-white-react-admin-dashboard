import {
    Button,
  Checkbox,
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
import { Dishes } from "../types/Dishes";
import { DishDialog } from "../dishDialogs";
import { UpdateDishDialog } from "../dishDialogs/UpdateDish";
import { AddDishDialog } from "../dishDialogs/AddDishDialog";
import { useAddToFavorites } from "../../Menus/api";
import { LightGreenColor } from "src/components/layout/Colors";
import { KitchenType } from "src/globalTypes";
import { AreYouSureDelete } from "../../Menus/filtermenus/components/AreYouSureDelete";
import { EnhancedTableHead, EnhancedTableToolbar } from "../../Menus/components/MenuTable";
import { FilterDishes } from "../types/FilterDishes";

const headCellsDishes: string[] = [
  "Naam", "thema", "opmerking", "rating", "acties"
]

export const DishTable = ({
    data, 
    page, 
    setPage,
  }: {
    data: FilterDishes; 
    page: number; 
    setPage: (newPage: number) => void;
    }) => {
    
    // TablePagination
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
    // Checkboxes
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: readonly string[] = [];
    
        if (selectedIndex === -1) {
          newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
          newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1),
          );
        }
    
        setSelected(newSelected);
      };
    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
          const newSelecteds = dishes.map((dish) => dish.id);
          setSelected(newSelecteds);
          return;
        }
        setSelected([]);
    };
    const isSelected = (id: string) => selected.indexOf(id) !== -1;

    // Dialogs
    const [open, setOpen] = React.useState(false);
    const [openUpdate, setOpenUpdate] = React.useState(false)
    const [areYouSureDelete, setAreYouSureDelete] = useState<boolean>(false);

    // Menu Data
    let dishes = data.filterDishes
    
     //Add to Favorites Mutation
    const { add } = useAddToFavorites({
      onCompleted: () => window.location.reload(),
    });

    
    return (
      <>
      <EnhancedTableToolbar selected={selected.map((item) => String(item))} />
<TableContainer component={Paper}>
<Table >
<EnhancedTableHead
numSelected={selected.length}
onSelectAllClick={handleSelectAllClick}
rowCount={dishes.length}
headCells={headCellsDishes}
/>
<TableBody>
{dishes.map((dish, index) => {
                const isItemSelected = isSelected(dish.id);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                    <>
                    <TableRow
                    hover
                    onClick={(event) => handleClick(event, dish.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={dish.id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell 
                    component="th"
                    id={labelId}
                    scope="row"
                    padding="none"
                    style={{ cursor: 'pointer' }}
                    onClick={() => setOpen(true)}
                    >{dish.name}</TableCell>
                    <TableCell align="left">{dish.theme}</TableCell>
                    <TableCell align="left">{dish.comment}</TableCell>
                    <TableCell align="left">{dish.rating}</TableCell>
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
                )
            })}
            </TableBody>
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