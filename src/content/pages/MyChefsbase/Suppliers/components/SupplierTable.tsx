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
import { ProductDialog } from "../../Products/productDialogs";
import { UpdateSupplierDialog } from "../supplierDialogs/updateSupplierDialog";
import { FilterSuppliers, FilterSuppliers_filterSuppliers } from "../types/FilterSuppliers";
import { SupplierDialog } from "../supplierDialogs";

const headCellsSuppliers: string[] = [
  "Naam", "email", "rating", "acties"
]

export const SupplierTable = ({
    data, 
    page, 
    setPage,
  }: {
    data: FilterSuppliers; 
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
          const newSelecteds = suppliers.map((supplier) => supplier.id);
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
    const [supplier, setSupplier] = React.useState<FilterSuppliers_filterSuppliers>()

    // Supplier Data
    let suppliers = data.filterSuppliers
    
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
rowCount={suppliers.length}
headCells={headCellsSuppliers}
/>
<TableBody>
{suppliers.map((supplier, index) => {
                const isItemSelected = isSelected(supplier.id);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                    <>
                    <TableRow
                    hover
                    onClick={(event) => handleClick(event, supplier.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={supplier.id}
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
                    onClick={() => {
                      setId(supplier.id);
                      setOpen(true)
                    }}
                    >{supplier.name}</TableCell>
                    <TableCell align="left">{supplier.email}</TableCell>
                    <TableCell align="left">{supplier.rating}</TableCell>
                    <TableCell 
                align="center"
                >
                  <>
                  <Grid container xs={12}>
                    <Grid item xs={4}>
                    <VscEdit  
                  onClick={() => {
                    setSupplier(supplier);
                    setOpenUpdate(true)
                  }}
                  style={{ cursor: 'pointer' }}/>
                  </Grid>
                  <Grid item xs={4}>
                  <VscTrash 
                  onClick={() => {
                    setId(supplier.id);
                    setAreYouSureDelete(true)
                  }}
                  style={{ cursor: 'pointer' }}/>
                  </Grid>
                  <Grid item xs={4}>
                  <VscStarEmpty onClick={() => {
                    add({variables: {
                      id: supplier.id,
                      kitchenType: KitchenType.Supplier
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
                   </TableContainer>
                   <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={data? (data.filterSuppliers? (data.filterSuppliers.length) : 1000) : 1000}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
            {id &&  (
              <>
              <SupplierDialog
              setId={() => setId(id)}
              id={id}
              open={open}
              onClose={() => setOpen(false)}
              />
              <AreYouSureDelete
                 open={areYouSureDelete}
                 id={id}
                 kitchenType={KitchenType.Supplier}
                 onClose={() => setAreYouSureDelete(false)}
                 />
              </>
            )}
            {supplier && (
              <UpdateSupplierDialog 
                 supplier={supplier}
                 open={openUpdate}
                 onClose={() => setOpenUpdate(false)}
                 /> 
            )}
                </>
    )
  }