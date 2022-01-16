import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, Paper, Table, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, TextFieldProps } from "@material-ui/core";
import { Typography } from "@mui/material";
import { Formik, useField } from "formik";
import React, { useState } from "react";
import { LoadingScreen } from "src/components/layout";
import { productToQ } from "..";
import { productsRowsPerPage, useSearchProductQuery } from "../api";
import { products_products } from "../types/products";


export  const TableProductData = ({
  setProduct
}: {
    setProduct: (selected: productToQ) => void
}) => {
    const [pageNumber, setPageNumber] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const handleChangePage = (
        event: any,
        newPage: React.SetStateAction<number>
      ) => {
        setPage(newPage as number);
        refetch({name: name, page: newPage});
      };
      const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPageNumber(0);
        };

    const [name, setName] = useState<string>()

    const [page, setPage] = useState<number>(0)

  const { loading, data, error, refetch } = useSearchProductQuery({
    name: name,
    page: page
    });
  if (loading) return <LoadingScreen />;
  if (error) return <LoadingScreen />;
  console.log(data.products)

  return (
    <TableContainer component={Paper}>
          <Table size="small">
              <TableRow>
              <Grid container spacing={2} xs={12}>
 <Grid key={0} item>
   <Typography>Zoek op naam:</Typography> 
 <TextField
    onKeyPress= {(e) => {
        if (e.key === 'Enter') {
        refetch({name: name})
      }
      }}      
      fullWidth
      placeholder="Zoek op naam"
      onChange={(e) => setName(e.target.value)}    />
    </Grid>
    </Grid>
              </TableRow>
        <TableRow>
          <TableCell>Product</TableCell>
          <TableCell>Merk</TableCell>
          <TableCell>Herkomst</TableCell>
          <TableCell>Prijs</TableCell>
          <TableCell>Voeg toe</TableCell>
        </TableRow>
        {data.products.map((product) => (
          <Row 
          data={product}
          setProduct={(a: productToQ) => setProduct(a)}/>
        ))}
        </Table>
        <TablePagination
              rowsPerPageOptions={[10]}
              component={Paper}
              count={data.numberOfProducts}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
      </TableContainer>
  )
}


const Row = ({data, setProduct}: {data: products_products, setProduct: (a) => void}) => {

    const formState: productToQ = {
    name: data.name,
    id: data.id,
    origin: data.origin,
    price: data.price.price,
    quantity: data.price.quantity.quantity,
    unit: data.price.quantity.unit,
    brand: data.brand,
  }
  const  [open, setOpen] = useState<boolean>(false)
  
    return (
      <Formik
          initialValues={formState}
          onSubmit={(values) => {
            setProduct(values);
          }}
        >
          {({ setFieldValue, submitForm }) => {
        return (
          <>
          <TableRow >
            <TableCell >
              {data.name}
            </TableCell>
            <TableCell >
              {data.brand}
            </TableCell>
            <TableCell >
              {data.origin}
            </TableCell>
            <TableCell align="left">€{data.price?.price} per {data.price?.quantity.quantity} {data.price?.quantity.unit}</TableCell>
            <TableCell>
            <Button
                    onClick={() => {submitForm()}}
                    color="primary"
                    variant="outlined"
                  >
                    +
                  </Button>
            </TableCell>
          </TableRow>
        </>
        )
          }
        }
        </Formik>
    )
  }
  