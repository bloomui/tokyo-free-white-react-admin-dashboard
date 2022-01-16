import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, Paper, Table, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, TextFieldProps } from "@material-ui/core";
import { Typography } from "@mui/material";
import { Formik, useField } from "formik";
import React, { useState } from "react";
import { LoadingScreen } from "src/components/layout";
import { H5 } from "src/content/pages/Components/TextTypes";
import { supplierToQ } from "..";
import { suppliersRowsPerPage, useSearchSupplierQuery } from "../api";
import { suppliers_suppliers } from "../types/suppliers";


export  const TableSupplierData = ({
  setSuppliers
}: {
    setSuppliers: (selected: supplierToQ) => void
}) => {
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

    const [name, setName] = useState<string>()

    const [page, setPage] = useState<number>(0)

  const { loading, data, error, refetch } = useSearchSupplierQuery({
    name: name,
    page: page
    });
  if (loading) return <LoadingScreen />;
  if (error) return <LoadingScreen />;

  return (
    <TableContainer component={Paper}>
          <Table size="small">
              <TableRow>
   <TableCell colSpan={2}>
 <TextField
    onKeyPress= {(e) => {
        if (e.key === 'Enter') {
          console.log(e.key);
        refetch({name: name})
      }
      }}      
      fullWidth
      placeholder="Zoek op naam"
      onChange={(e) => setName(e.target.value)}    />
      </TableCell>
      <TableCell>
      Klik enter om te zoeken
    </TableCell>
              </TableRow>
        <TableRow>
          <TableCell>Leverancier</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Voeg toe</TableCell>
        </TableRow>
        {data.suppliers.map((supplier) => (
          <Row 
          data={supplier}
          setSupplier={(a: supplierToQ) => setSuppliers(a)}/>
        ))}
        </Table>
        <TablePagination
              rowsPerPageOptions={[10]}
              component={Paper}
              count={data.numberOfSuppliers}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
      </TableContainer>
  )
}


const Row = ({data, setSupplier}: {data: suppliers_suppliers, setSupplier: (a) => void}) => {

    const formState: supplierToQ = {
    name: data.name,
    id: data.id,
    email: data.email,
  }
  const  [open, setOpen] = useState<boolean>(false)
  
    return (
      <Formik
          initialValues={formState}
          onSubmit={(values) => {
            setSupplier(values);
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
              {data.email}
            </TableCell>
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
  