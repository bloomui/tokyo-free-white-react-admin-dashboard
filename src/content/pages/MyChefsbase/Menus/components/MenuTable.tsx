import {
    Grid,
    IconButton,
      Paper,
      Table,
      TableBody,
      TableCell,
      TableContainer,
      TableHead,
      TablePagination,
      TableRow,
      Toolbar,
      Tooltip,
      Typography,
    } from "@material-ui/core";
    import React, { useState } from "react";
  import { useAddToFavorites, useAddToFavoritesMultiple, useDelete, useDeleteMultiple, useMenuQuery } from "../api";
  import { VscStarFull, VscStarEmpty, VscTrash, VscAdd, VscSearch, VscEdit } from "react-icons/vsc";
import { KitchenType } from "src/globalTypes";
import Checkbox from "@mui/material/Checkbox";
import { MenuDialog } from "../menuDialog";
import { UpdateMenuDialog } from "../menuDialog/UpdateMenu";
import { AreYouSureDelete } from "../filtermenus/components/AreYouSureDelete";
import { FilterMenus, FilterMenus_filterMenus } from "../types/FilterMenus";
  
export interface EnhancedTableProps {
    numSelected: number;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    rowCount: number;
    headCells: string[];
  }

  const headCellsMenus: string[] = [
      "Naam", "seizoen", "thema", "vanaf", "tot", "rating", "acties"
  ]

export function EnhancedTableHead(props: EnhancedTableProps) {
    const { onSelectAllClick, numSelected, rowCount, headCells } = props;
  
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
    data, 
    page, 
    setPage,
  }: {
    data: FilterMenus; 
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
          const newSelecteds = menus.map((menu) => menu.id);
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
    const [menu, setMenu] = React.useState<FilterMenus_filterMenus>()

    // Menu Data
    let menus = data.filterMenus
    
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
              rowCount={menus.length}
              headCells={headCellsMenus}
            />
            <TableBody>
            {menus.map((menu, index) => {
                const isItemSelected = isSelected(menu.id);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                    <>
                    <TableRow
                    hover
                    onClick={(event) => handleClick(event, menu.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={menu.id}
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
                      setId(menu.id);
                      setOpen(true)}
                    }
                    >{menu.name}</TableCell>
                    <TableCell align="left">{menu.season}</TableCell>
                    <TableCell align="left">{menu.theme}</TableCell>
                    <TableCell align="left">{menu.periodstartdate}</TableCell>
                    <TableCell align="left">{menu.periodenddate}</TableCell>
                    <TableCell align="left">{menu.rating}</TableCell>
                    <TableCell 
                align="center"
                >
                  <>
                  <Grid container xs={12}>
                    <Grid item xs={4}>
                  <VscEdit  
                  onClick={() => {
                    setMenu(menu);
                    setOpenUpdate(true)
                  }}
                  style={{ cursor: 'pointer' }}/>
                  </Grid>
                  <Grid item xs={4}>
                  <VscTrash 
                  onClick={() => {
                    setId(menu.id);
                    setAreYouSureDelete(true)
                  }}
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
            {id &&  (
              <>
              <MenuDialog
              setId={() => setId(id)}
              id={id}
              open={open}
              onClose={() => setOpen(false)}
              />
              <AreYouSureDelete
                 open={areYouSureDelete}
                 id={id}
                 kitchenType={KitchenType.Menu}
                 onClose={() => setAreYouSureDelete(false)}
                 />
              </>
            )}
            {menu && (
              <UpdateMenuDialog 
                 menu={menu}
                 open={openUpdate}
                 onClose={() => setOpenUpdate(false)}
                 /> 
            )}
                </>
    )
  }
  
export const EnhancedTableToolbar = ({
      selected
  }:{
      selected: string[]
    }) => {
        const numSelected = selected.length

        const {removeMultiple } = useDeleteMultiple({
            onCompleted: () => window.location.reload(),
          });

          const { addMultiple } = useAddToFavoritesMultiple({
            onCompleted: () => window.location.reload(),
          });
        
    return (
      <Toolbar
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} geselecteerd
          </Typography>
        ) : (<></>)}
        {numSelected > 0 ? (
            <Grid container xs={12}>
                <Grid item xs={6} onClick={() => {
                    removeMultiple({variables: {
                        ids: selected,
                        kitchenType: KitchenType.Menu
                    }});
                }
              }>
          <Tooltip title="Verwijderen">
            <IconButton>
              <VscTrash />
            </IconButton>
          </Tooltip>
          </Grid>
          <Grid item xs={6} onClick={() => {
                    addMultiple({variables: {
                        ids: selected,
                        kitchenType: KitchenType.Menu
                    }});
                }
              }>
          <Tooltip title="Toevoegen aan favorieten">
          <IconButton>
            <VscStarFull />
          </IconButton>
        </Tooltip>
        </Grid>
        </Grid>
        ) : (<></>)}
      </Toolbar>
    );
  };