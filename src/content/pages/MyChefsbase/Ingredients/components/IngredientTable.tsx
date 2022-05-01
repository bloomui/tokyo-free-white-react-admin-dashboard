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
  import { VscStarFull, VscStarEmpty, VscTrash, VscAdd, VscSearch, VscEdit } from "react-icons/vsc";
import { useAddToFavorites } from "../../Menus/api";
import { KitchenType } from "src/globalTypes";
import { AreYouSureDelete } from "../../Menus/filtermenus/components/AreYouSureDelete";
import { EnhancedTableHead, EnhancedTableToolbar } from "../../Menus/components/MenuTable";
import { FilterIngredients, FilterIngredients_filterIngredients } from "../types/FilterIngredients";
import { IngredientDialog } from "../ingredientDialogs";
import { UpdateIngredientDialog } from "../ingredientDialogs/UpdateIngredientDialog";

const headCellsIngredients: string[] = [
  "Naam", "categorie", "status", "rating", "acties"
]

export const IngredientTable = ({
    data, 
    page, 
    setPage,
  }: {
    data: FilterIngredients; 
    page: number; 
    setPage: (newPage: number) => void;
    }) => {
    
    // TablePagination
    const [pageNumber, setPageNumber] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(20);
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
          const newSelecteds = ingredients.map((ingredient) => ingredient.id);
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
    const [id, setId] = React.useState<string>()
    const [ingredient, setIngredient] = React.useState<FilterIngredients_filterIngredients>()
    const [ingr, setIngr] = React.useState<FilterIngredients_filterIngredients>()

    // ingredient Data
    let ingredients = data.filterIngredients
    
     //Add to Favorites Mutation
    const { add } = useAddToFavorites({
      onCompleted: () => window.location.reload(),
    });

    
    return (
      <>
      <EnhancedTableToolbar 
      kitchenType={KitchenType.Ingredient}
      selected={selected.map((item) => String(item))} />
<TableContainer component={Paper}>
<Table >
<EnhancedTableHead
numSelected={selected.length}
onSelectAllClick={handleSelectAllClick}
rowCount={ingredients.length}
headCells={headCellsIngredients}
/>
<TableBody>
{ingredients.map((ingredient, index) => {
                const isItemSelected = isSelected(ingredient.id);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                    <>
                    <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={ingredient.id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        onClick={(event) => handleClick(event, ingredient.id)}
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
                    onClick={() => {
                      setId(ingredient.id);
                      setIngr(ingredient);
                      setOpen(true)
                    }}
                    >{ingredient.name}</TableCell>
                    <TableCell align="left">{ingredient.category}</TableCell>
                    <TableCell align="left">{ingredient.status}</TableCell>
                    <TableCell align="left">{ingredient.rating}</TableCell>
                    <TableCell 
                align="center"
                >
                  <>
                  <Grid container xs={12}>
                    <Grid item xs={4}>
                    <VscEdit  
                  onClick={() => {
                    setIngredient(ingredient);
                    setOpenUpdate(true)
                  }}
                  style={{ cursor: 'pointer' }}/>
                  </Grid>
                  <Grid item xs={4}>
                  <VscTrash 
                  onClick={() => {
                    setId(ingredient.id);
                    setAreYouSureDelete(true)
                  }}
                  style={{ cursor: 'pointer' }}/>
                  </Grid>
                  <Grid item xs={4}>
                  <VscStarEmpty onClick={() => {
                    add({variables: {
                      id: ingredient.id,
                      kitchenType: KitchenType.Ingredient
                    }});
                  }
                }
                  style={{ cursor: 'pointer' }}/>
                  </Grid>
                  </Grid>
                  </>
                </TableCell>
                  </TableRow>
                 </>
                )
            })}
            </TableBody>
                   </Table>
                   <TablePagination
              rowsPerPageOptions={[20]}
              component={Paper}
              count={data.numberOfIngredients}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
             </TableContainer>
            {id &&  (
              <>
              <IngredientDialog
              setId={() => setId(id)}
              id={id}
              open={open}
              onClose={() => setOpen(false)}
              />
              <AreYouSureDelete
                 open={areYouSureDelete}
                 id={id}
                 kitchenType={KitchenType.Ingredient}
                 onClose={() => setAreYouSureDelete(false)}
                 />
              </>
            )}
            {ingredient && (
              <UpdateIngredientDialog 
                 id={ingredient.id}
                 open={openUpdate}
                 onClose={() => setOpenUpdate(false)}
                 /> 
            )}
                </>
    )
  }