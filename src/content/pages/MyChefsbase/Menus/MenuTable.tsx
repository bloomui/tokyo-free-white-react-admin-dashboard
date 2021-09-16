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
import { SearchDirect } from "src/components/search/SearchInputField";
import Checkbox from "@mui/material/Checkbox";
import { MenuDialog } from "./menuDialog";
import { UpdateMenuDialog } from "./menuDialog/UpdateMenu";
  
interface EnhancedTableProps {
    numSelected: number;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    rowCount: number;
  }

  const headCells: string[] = [
      "Naam", "seizoen", "thema", "vanaf", "tot", "rating"
  ]

function EnhancedTableHead(props: EnhancedTableProps) {
    const { onSelectAllClick, numSelected, rowCount } = props;
  
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts',
              }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
            >{headCell}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  export const MenuTable = ({
    name,
    setName,
    data, 
    page, 
    setPage,
  }: {
      name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
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
    const [selected, setSelected] = React.useState<readonly string[]>([]);

    let menus;
    if (name != null) menus = data.menus;
     else menus = data.filterMenus
    
     console.log(menus)
    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
          const newSelecteds = menus.map((menu) => menu.name);
          setSelected(newSelecteds);
          return;
        }
        setSelected([]);
      };

      const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected: readonly string[] = [];
    
        if (selectedIndex === -1) {
          newSelected = newSelected.concat(selected, name);
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
    const isSelected = (name: string) => selected.indexOf(name) !== -1;

    
    return (
        <>
                <SearchDirect placeholder="Zoek Menu" value={name} onChange={setName} isLoading={false}/>
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
              <EnhancedTableHead
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={menus.length}
            />
            <TableBody>
            {menus.map((menu, index) => {
                const isItemSelected = isSelected(menu.name);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                    <>
                    <TableRow
                    hover
                    onClick={(event) => handleClick(event, menu.name)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={menu.name}
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
                    >
                      {menu.name}
                    </TableCell>
                    <TableCell align="right">{menu.season}</TableCell>
                    <TableCell align="right">{menu.theme}</TableCell>
                    <TableCell align="right">{menu.periodstartdate}</TableCell>
                    <TableCell align="right">{menu.periodenddate}</TableCell>
                    <TableCell align="right">{menu.rating}</TableCell>
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
                 <MenuDialog
              setOpenUpdateDialog={() => setOpenUpdate(true)}
              menu={menu}
              open={open}
              onClose={() => setOpen(false)}
              />
              <UpdateMenuDialog 
                allDishes={data.dishes}
                 menu={menu}
                 open={openUpdate}
                 onClose={() => setOpenUpdate(false)}
                 /> 
                 <AreYouSureDelete
                 open={areYouSureDelete}
                 id={menu.id}
                 kitchenType={KitchenType.Menu}
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