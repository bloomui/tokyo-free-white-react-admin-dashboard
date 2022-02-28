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
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import {
  VscStarFull,
  VscStarEmpty,
  VscTrash,
  VscAdd,
  VscSearch,
  VscEdit,
} from "react-icons/vsc";
import { useAddToFavorites } from "../../Menus/api";
import { KitchenType } from "src/globalTypes";
import { AreYouSureDelete } from "../../Menus/filtermenus/components/AreYouSureDelete";
import {
  EnhancedTableHead,
  EnhancedTableToolbar,
} from "../../Menus/components/MenuTable";
import {
  FilterRecipes,
  FilterRecipes_filterRecipes,
  FilterRecipes_filterRecipes_quantity,
} from "../types/FilterRecipes";
import { RecipeDialog } from "../recipeDialogs";
import { UpdateRecipeDialog } from "../recipeDialogs/UpdateRecipeDialog";
import { recipeRowsPerPage } from "../api";
import { DialogHere } from "../../Content";

const headCellsRecipes: string[] = ["Naam", "type", "rating", "acties"];

export const RecipeTable = ({
  data,
  page,
  setPage,
}: {
  data: FilterRecipes;
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
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = recipes.map((recipe) => recipe.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  // Dialogs
  const [open, setOpen] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [areYouSureDelete, setAreYouSureDelete] = useState<boolean>(false);
  const [recipe, setRecipe] = React.useState<FilterRecipes_filterRecipes>();

  // recipe Data
  let recipes = data.filterRecipes;

  //Add to Favorites Mutation
  const { add } = useAddToFavorites({
    onCompleted: () => window.location.reload(),
  });

  return (
    <>
      <EnhancedTableToolbar
        kitchenType={KitchenType.Recipe}
        selected={selected.map((item) => String(item))}
      />
      <TableContainer component={Paper}>
        <Table>
          <EnhancedTableHead
            numSelected={selected.length}
            onSelectAllClick={handleSelectAllClick}
            rowCount={recipes.length}
            headCells={headCellsRecipes}
          />
          <TableBody>
            {recipes.map((recipe, index) => {
              const isItemSelected = isSelected(recipe.id);
              const labelId = `enhanced-table-checkbox-${index}`;
              return (
                <>
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={recipe.id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        onClick={(event) => handleClick(event, recipe.id)}
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setRecipe(recipe);
                        setOpen(true);
                      }}
                    >
                      {recipe.name}
                    </TableCell>
                    <TableCell align="left">{recipe.type}</TableCell>
                    <TableCell align="left">{recipe.rating}</TableCell>
                    <TableCell align="center">
                      <>
                        <Grid container xs={12}>
                          <Grid item xs={4}>
                            <VscEdit
                              onClick={() => {
                                setRecipe(recipe);
                                setOpenUpdate(true);
                              }}
                              style={{ cursor: "pointer" }}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <VscTrash
                              onClick={() => {
                                setRecipe(recipe);
                                setAreYouSureDelete(true);
                              }}
                              style={{ cursor: "pointer" }}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <VscStarEmpty
                              onClick={() => {
                                add({
                                  variables: {
                                    id: recipe.id,
                                    kitchenType: KitchenType.Recipe,
                                  },
                                });
                              }}
                              style={{ cursor: "pointer" }}
                            />
                          </Grid>
                        </Grid>
                      </>
                    </TableCell>
                  </TableRow>
                </>
              );
            })}
          </TableBody>
        </Table>
        {/* <TableRow> */}
        <TablePagination
          rowsPerPageOptions={[10]}
          component={Paper}
          count={data.numberOfRecipes}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        {/* </TableRow> */}
      </TableContainer>
      {recipe && (
        <>
          <DialogHere
            recipe={recipe}
            open={open}
            onClose={() => setOpen(false)}
          />
          <AreYouSureDelete
            open={areYouSureDelete}
            id={recipe.id}
            kitchenType={KitchenType.Recipe}
            onClose={() => setAreYouSureDelete(false)}
          />
          <UpdateRecipeDialog
          recipe={recipe}
          open={openUpdate}
          onClose={() => setOpenUpdate(false)}
        />
        </>
      )}
    </>
  );
};
