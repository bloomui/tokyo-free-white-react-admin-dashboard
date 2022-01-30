import { useQuery } from "@apollo/client";
import { Paper, Grid, Button, Dialog, DialogActions, DialogTitle, DialogContent, Card, CardActions, CardContent, Collapse, IconButton, IconButtonProps, styled, TextField, TableRow, Table, TableCell, TableContainer, Autocomplete } from "@material-ui/core";
import { Formik, Form, useFormikContext, FieldArray } from "formik";
import { StringValueNode } from "graphql";
import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { LoadingScreen } from "src/components/layout";
import {useNavigate} from 'react-router-dom';
import { MenuFilterInput } from "src/globalTypes";
import { MenusData } from "../api";
import { Dishes } from "./components/dishes";
import { Ingredients } from "./components/ingredients";
import { InsertPeriod } from "./components/period";
import { FilterProducts, Products } from "./components/products";
import { Rating1 } from "./components/rating";
import { Recipes } from "./components/recipes";
import { Search } from "./components/search";
import { Seasons } from "./components/seasons";
import { Suppliers } from "./components/suppliers";
import { Themes } from "./components/themes";
import { product_product } from "../../Products/types/product";
import { useSearchProductFilterQuery, useSearchProductQuery } from "../../Ingredients/AddIngredient/api";
import { H5 } from "src/content/pages/Components/TextTypes";
import { productToQ } from "../../Ingredients/AddIngredient";
import { searchProduct_searchProduct } from "../../Ingredients/AddIngredient/types/searchProduct";

  export const MenuFilterDialog = ({
    initialValues,
    themes,
    seasons,
    onChange,
  }: {
    initialValues: MenuFilterInput;
    themes: string[] | null;
    seasons: string[] | null;
    onChange: (values: MenuFilterInput) => void;
  }) => {
    const [ openFilterInputDialog, setOpenFilterInputDialog] = React.useState(false)
    const navigate = useNavigate()
    const [productname, setProductname] = useState('')

    const  emptyOne: searchProduct_searchProduct = {
      __typename: "Product",
      name: '',
      id: ''
    }
    const [selectedProducts, setProducts] = React.useState<searchProduct_searchProduct[]>([emptyOne]);

    const { data, loading, error, refetch } = useSearchProductFilterQuery({productname: productname})
        
    return (
      <Card>
        <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
         onChange(values)
        }}
        >
        {({ setFieldValue }) => {
          return (
            <>
      <Grid container xs={12}>
            <CardActions disableSpacing>
            <Grid key={0} item>
           <Search placeholder="Zoek Menu" setFieldValue={setFieldValue}/>
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
        <Button fullWidth color="secondary" variant="contained" onClick={() => navigate("/mychefsbase/addmenu")}>
                      <span> Nieuw menu</span>
                  </Button>
        </Grid>
      </CardActions>
      </Grid>
      <Collapse in={openFilterInputDialog} timeout="auto" unmountOnExit>
        <CardContent>   
                  <Grid container spacing={2} xs={12}>
           <Grid item xs={3}>
            <InsertPeriod setFieldValue={setFieldValue}/>
            </Grid>
            <Grid xs={1}></Grid>
            <Grid item xs={3}>
            <Themes 
            themes={themes}
            setFieldValue={setFieldValue} />
            </Grid>
            <Grid xs={1}></Grid>
            <Grid item xs={3}>
            <Seasons 
            seasons={seasons}
            setFieldValue={setFieldValue} />
            </Grid>
            <Grid xs={1}></Grid>
            <Grid item xs={3}>
           <Rating1 
           updateField="rating"
           setFieldValue={setFieldValue}/>
           </Grid>
           <Grid xs={1}></Grid>
            <Grid item xs={3}>
              <Suppliers 
              setFieldValue={setFieldValue} />
          </Grid>
          <Grid xs={1}></Grid>
           <Grid item xs={3}> 
           <Products 
              setFieldValue={setFieldValue} />
              </Grid>
              <Grid xs={1}></Grid>
              <Grid item xs={3}> 
           <Products 
              setFieldValue={setFieldValue} />
              </Grid>
              <Grid xs={1}></Grid>
              <Grid item xs={3}> 
           <Products 
              setFieldValue={setFieldValue} />
              </Grid>
              <Grid xs={1}></Grid>
              <Grid item xs={3}> 
            <Products 
            setFieldValue={setFieldValue} />
            </Grid>
            <Grid xs={1}></Grid>
            <Grid item xs={3}>
            <Ingredients 
            setFieldValue={setFieldValue} />
            </Grid>
            <Grid xs={1}></Grid>
            <Grid item xs={3}>
            <Recipes 
            setFieldValue={setFieldValue} />
            </Grid>
            <Grid xs={1}></Grid>
            <Grid item xs={3}>
            <Dishes 
            setFieldValue={setFieldValue} />
            </Grid>   
            </Grid>   
              </CardContent>
              </Collapse>
              <AutoSubmitToken />
              </>
          )
        }}
      </Formik>
      </Card>
          )
        }

  export const AutoSubmitToken = () => {
          const { values, submitForm } = useFormikContext();
          React.useEffect(() => {
          if (true) {
          submitForm();
          }
          }, [values, submitForm]);
          return null;
          };

export interface ExpandMoreProps extends IconButtonProps {
            expand: boolean;
          }
          
export const ExpandMore = styled((props: ExpandMoreProps) => {
            const { expand, ...other } = props;
            return <IconButton {...other} />;
          })(({ theme, expand }) => ({
            transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
              duration: theme.transitions.duration.shortest,
            }),
          }));

          export const FilterOnProducts = (
            {
              setFieldValue,
            }: {
              setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
            }
          ) => {
            const [name, setName] = useState('')
            const [products, setProducts] = useState<idToName[]>([])
            function handleDelete(index) {
              products.splice(index, 1)
              setProducts([...products])
            }

            const {data, error, loading, refetch} = useSearchProductFilterQuery({
              productname: name,
            })
            if (loading) return <LoadingScreen />;
            if (error) return <LoadingScreen />;

            return (
              <>
              <TextField
              onKeyPress= {(e) => {
                if (e.key === 'Enter') {
                  console.log(e.key);
                refetch({productname: name})
              }
              }}   
      fullWidth
      placeholder="Producten"
      onChange={(e) => setName(e.target.value)}
    />
    <Grid container xs={12}>
    <Grid xs={6}>
        <Table>
    {products.map((product, index) => (
      <TableRow>
        <TableCell>
        {product.name}
        </TableCell>
        <TableCell>
          <Button onClick={() => handleDelete(index)}>-</Button>
        </TableCell>
      </TableRow>
    ))}
    </Table></Grid>
      <Grid xs={6}>
        <Table>
    {data && data.searchProduct && data.searchProduct.map((product, index) => (
      <TableRow>
        <TableCell>
        {product.name}
        </TableCell>
        <TableCell>
          <Button onClick={() => products.push({
            id: product.id,
            name: product.name})
          }>+</Button>
        </TableCell>
      </TableRow>
    ))}
    </Table>
    </Grid>
      
    <Grid xs={12}>
      <Button variant="contained" color="primary" 
    onClick={() => setFieldValue("products", products.map((option) => option.id))}>
      Filters toepassen
      </Button>
      </Grid>
    </Grid>
              </>
            )
          }
          export type idToName = {
            id: string,
            name: string
          }