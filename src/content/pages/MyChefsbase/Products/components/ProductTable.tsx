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
import { FilterProducts, FilterProducts_filterProducts } from "../types/FilterProducts";
import { ProductDialog } from "../productDialogs";
import { UpdateProductDialog } from "../productDialogs/updateProductDialog";

const headCellsProducts: string[] = [
  "Naam", "prijs", "afkomst", "merk", "rating", "acties"
]

export const ProductTable = ({
    data, 
    page, 
    setPage,
  }: {
    data: FilterProducts; 
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
          const newSelecteds = products.map((product) => product.id);
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
    const [product, setProduct] = React.useState<FilterProducts_filterProducts>()

    // ingredient Data
    let products = data.filterProducts
    
     //Add to Favorites Mutation
    const { add } = useAddToFavorites({
      onCompleted: () => window.location.reload(),
    });

    
    return (
      <>
      <EnhancedTableToolbar
      kitchenType={KitchenType.Product}
      selected={selected.map((item) => String(item))} />
<TableContainer component={Paper}>
<Table >
<EnhancedTableHead
numSelected={selected.length}
onSelectAllClick={handleSelectAllClick}
rowCount={products.length}
headCells={headCellsProducts}
/>
<TableBody>
{products.map((product, index) => {
                const isItemSelected = isSelected(product.id);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                    <>
                    <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={product.id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        onClick={(event) => handleClick(event, product.id)}
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
                      setId(product.id);
                      setOpen(true)
                    }}
                    >{product.name}</TableCell>
                    <TableCell align="left">€{product.price?.price} per {product.price?.quantity.quantity} {product.price?.quantity.unit}</TableCell>
                    <TableCell align="left">{product.origin}</TableCell>
                    <TableCell align="left">{product.brand}</TableCell>
                    <TableCell align="left">{product.rating}</TableCell>
                    <TableCell 
                align="center"
                >
                  <>
                  <Grid container xs={12}>
                    <Grid item xs={4}>
                    <VscEdit  
                  onClick={() => {
                    setProduct(product);
                    setOpenUpdate(true)
                  }}
                  style={{ cursor: 'pointer' }}/>
                  </Grid>
                  <Grid item xs={4}>
                  <VscTrash 
                  onClick={() => {
                    setId(product.id);
                    setAreYouSureDelete(true)
                  }}
                  style={{ cursor: 'pointer' }}/>
                  </Grid>
                  <Grid item xs={4}>
                  <VscStarEmpty onClick={() => {
                    add({variables: {
                      id: product.id,
                      kitchenType: KitchenType.Product
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
              count={data.numberOfProducts}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
            {id &&  (
              <>
              <ProductDialog
              setId={() => setId(id)}
              id={id}
              open={open}
              onClose={() => setOpen(false)}
              />
              <AreYouSureDelete
                 open={areYouSureDelete}
                 id={id}
                 kitchenType={KitchenType.Product}
                 onClose={() => setAreYouSureDelete(false)}
                 />
              </>
            )}
            {product && (
              <UpdateProductDialog 
                 product={product}
                 open={openUpdate}
                 onClose={() => setOpenUpdate(false)}
                 /> 
            )}
                </>
    )
  }