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
  import { Menus, Menus_filterMenus } from "./types/Menus";
  import StarRateTwoToneIcon from '@material-ui/icons/StarRateTwoTone';
  import { useAddToFavorites, useDelete, useMenuQuery } from "./api";
  import { VscStarFull, VscStarEmpty, VscTrash, VscAdd, VscSearch, VscEdit } from "react-icons/vsc";
  import { useMutation } from "@apollo/client";
import { KitchenType } from "src/globalTypes";
  
  export const MenuTable = ({
    data, 
    page, 
    setPage,
  }: {
    data: Menus; 
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
    const [openAddMenu, setOpenAddMenu] = useState(false)
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
                <Button color="secondary" variant="contained" onClick={() => setOpenAddMenu(true)}>
                    <Grid 
                    onClick={() => setOpenAddMenu(true)}
                    container xs={12}>
                      <Grid item xs={12}>
                      <Typography><span><VscAdd /> Nieuw menu</span></Typography>
                      </Grid>
                      </Grid> 
                  </Button>
              <Table >
              <TableHead>
              <TableRow>
                <TableCell>Menu naam</TableCell>
                <TableCell align="center">seizoen</TableCell>
                <TableCell align="center">Thema</TableCell>
                <TableCell align="center" colSpan={2}>Periode</TableCell>
                <TableCell align="center">Rating</TableCell>
                <TableCell align="center">Acties</TableCell>
              </TableRow>
              </TableHead>
            <TableBody>
            {data && data.filterMenus && data.filterMenus.map((menu) => (
              menu? (
                <>
              <TableRow>
                <TableCell 
                style={{ cursor: 'pointer' }}
                onClick={() => setOpen(true)}
                >{menu.name}</TableCell>
                <TableCell align="center">{menu.season}</TableCell>
                <TableCell align="center">{menu.theme}</TableCell>
                <TableCell align="center">{menu.periodstartdate}</TableCell>
                <TableCell align="center">{menu.periodenddate}</TableCell>
                <TableCell align="center">{menu.rating}</TableCell>
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
                      id: menu.id,
                      kitchenType: KitchenType.Menu
                    }});
                  }
                }
                  style={{ cursor: 'pointer' }}/>
                  </Grid>
                  </Grid>
                  </>
                </TableCell>
              </TableRow>
              {/* <MenuDialog
              setOpenUpdateDialog={() => setOpenUpdate(true)}
              menu={menu}
              open={open}
              onClose={() => setOpen(false)}
              /> */}
              {/* <UpdateMenuDialog 
                allDishes={data.dishes}
                 menu={menu}
                 open={openUpdate}
                 onClose={() => setOpenUpdate(false)}
                 /> */}
                 <AreYouSureDelete
                 open={areYouSureDelete}
                 id={menu.id}
                 kitchenType={KitchenType.Menu}
                 onClose={() => setAreYouSureDelete(false)}
                 />
              </>
            ): <TableRow>
              Geen menu's beschikbaar
            </TableRow>
            ))}
            </TableBody>
            {/* <AddMenuDialog 
                allDishes={data.dishes}
                 open={openAddMenu}
                 onClose={() => setOpenAddMenu(false)}
                 /> */}
                   </Table>
                   </TableContainer>
                   <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={data? (data.filterMenus? (data.filterMenus.length) : 1000) : 1000}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
                </>
    )
  }
  
  export const AreYouSureDelete = ({
    id,
    kitchenType,
    open,
    onClose,
  }: {
    id: string;
    kitchenType: KitchenType;
    open: boolean;
    onClose: () => void;
  }) => {
    const {remove, error, loading} = useDelete({
      onCompleted: () => {}
    });
    return (
      <Dialog open={open}>
        <DialogContent>
          Weet u zeker dat u dit item wilt verwijderen?
        </DialogContent>
        <Grid container xs={12}>
          <Grid item xs={6}>
          <Button
          onClick={() => remove({
            variables: {
              id: id,
              kitchenType: kitchenType
            }
          })}>
          Ja
        </Button>
          </Grid>
          <Grid item xs={6}>
          <Button 
          onClick={onClose}>
          Nee, ga terug
        </Button>
          </Grid>
        </Grid>
      </Dialog>
    )
  }