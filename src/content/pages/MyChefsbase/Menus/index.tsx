import {
    Box,
    LinearProgress,
    Grid,
    Button,
    Card,
    CardActions,
    CardContent,
    Collapse,
    Typography,
    IconButton,
    IconButtonProps,
    styled,
  } from "@material-ui/core";
  import TablePagination from '@material-ui/core/TablePagination';
import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { VscAdd } from "react-icons/vsc";
import { LoadingScreen } from "src/components/layout";
import { SearchDirect } from "src/components/search/SearchInputField";
import { MenuFilterInput } from "src/globalTypes";
import { useMenuQuery } from "./api";
import { MenuFilterDialog } from "./filtermenus";
import { initialMenuValues } from "./filtermenus/components/initialMenuValues";
import { AddMenuDialog } from "./menuDialog/AddMenu";
import { MenuTable } from "./MenuTable";
  
interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
  }
  
  const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));
  
  export const MenuPage = ({
    page,
    setPage,
  }: {
    page: number;
    setPage: (newPage: number) => void;
  }) => {

    const [name, setName] = useState()
    const [openAddMenu, setOpenAddMenu] = useState(false)
    const [ input, setInput] = useState<MenuFilterInput>(initialMenuValues);
    const [ openFilterInputDialog, setOpenFilterInputDialog] = React.useState(false)
    const { loading, data } = useMenuQuery({
      input: input,
      });
            
    function searchName (name: string) {
        const input: MenuFilterInput = {
        name: name,
    offset: 0,
    limit: 0,
    themes: [],
    seasons: [],
    periodstartdate: '',
    periodenddate: '',
    recipes: [],
    dishes: [],
    ingredients: [],
    products: [],
    suppliers: [],
    rating: 0
        }
        setInput(input)
    }

    let content;
    if (loading && !data) content = <LoadingScreen />;
    else if (data) {
      content = (
        <>
        <Card>
            <Grid container xs={12}>
            <CardActions disableSpacing>
        <Grid key={0} item >
        <SearchDirect placeholder="Zoek Menu" value={name} onChange={() => searchName} isLoading={false}/>
        </Grid>
        <Grid key={1} item>
            <ExpandMore
          expand={openFilterInputDialog}
          onClick={() => setOpenFilterInputDialog(!openFilterInputDialog)}
          aria-expanded={openFilterInputDialog}
          aria-label="Geavanceerd zoeken"
        >
          <FaFilter/>
        </ExpandMore>
        </Grid>
        <Grid key={2} item>
        <Button fullWidth color="secondary" variant="contained" onClick={() => setOpenAddMenu(true)}>
                      <span> Nieuw menu</span>
                  </Button>
        </Grid>
      </CardActions>
      <Collapse in={openFilterInputDialog} timeout="auto" unmountOnExit>
        <CardContent>
        <MenuFilterDialog
        name={name}
        onClose={() => setOpenFilterInputDialog(false)}
        initialValues={initialMenuValues}
        suppliers={data.suppliers}
        products={data.products}
        dishes={data.dishes}
        recipes={data.recipes}
        ingredients={data.ingredients}
        themes={data.allThemes}
        seasons={data.allSeasons}
        onChange={(values) => setInput(values)}
        />
        </CardContent>
      </Collapse>
        <Grid key={2} item xs={12}>
        <MenuTable
        data={data}
        page={page}
        setPage={setPage}
        />
        </Grid>
        </Grid>
        </Card>
        <AddMenuDialog 
                  allDishes={data.dishes}
                  open={openAddMenu}
                  onClose={() => setOpenAddMenu(false)}
                  />
        </>
      );
    }
  
    return (
      <>
          <Box height={3}>{loading && <LinearProgress />}</Box>
        {content}
      </>
    );
  };
