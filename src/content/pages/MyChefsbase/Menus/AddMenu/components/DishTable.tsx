import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, Paper, Table, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, TextFieldProps } from "@material-ui/core";
import { Typography } from "@mui/material";
import { Formik, useField } from "formik";
import React, { useState } from "react";
import { FormikSelect } from "src/components/form/FormikSelect";
import { LoadingScreen } from "src/components/layout";
import { recipeToQ } from "..";
import { units } from "../../../Ingredients/ingredientDialogs/UpdateIngredientDialog";
import { menu_menu_courses, menu_menu_courses_course } from "../../types/menu";

export  const TableDishData = {}
// ({
//     courses,
//   setDishes
// }: {
//     courses: menus_menu_courses_course[],
//     setDishes: (selected: dishToQ) => void
// }) => {
//     const [pageNumber, setPageNumber] = React.useState(0);
//     const [rowsPerPage, setRowsPerPage] = React.useState(10);
//     const handleChangePage = (
//         event: any,
//         newPage: React.SetStateAction<number>
//       ) => {
//         setPage(newPage as number);
//       };
//       const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
//           setRowsPerPage(parseInt(event.target.value, 10));
//           setPageNumber(0);
//         };

//     const [name, setName] = useState<string>()

//     const [page, setPage] = useState<number>(0)

//   const { loading, data, error, refetch } = useSearchRecipeQuery({
//     name: name,
//     page: page
//     });
//   if (loading) return <LoadingScreen />;
//   if (error) return <LoadingScreen />;

//   return (
//     <TableContainer component={Paper}>
//           <Table size="small">
//               <TableRow>
//               <Grid container spacing={2} xs={12}>
//  <Grid key={0} item>
//    <Typography>Zoek op naam:</Typography> 
//  <TextField
//     onKeyPress= {(e) => {
//         if (e.key === 'Enter') {
//           console.log(e.key);
//         refetch({name: name})
//       }
//       }}      
//       fullWidth
//       placeholder="Zoek op naam"
//       onChange={(e) => setName(e.target.value)}    />
//     </Grid>
//     </Grid>
//               </TableRow>
//         <TableRow>
//           <TableCell>Gerecht</TableCell>
//           <TableCell>thema</TableCell>
//           <TableCell>Voeg toe</TableCell>
//         </TableRow>
//         {data.dishes.map((dish) => (
//           <Row 
//           courses={courses}
//           data={dish}
//           setDish={(a: recipeToQ) => setDishes(a)}/>
//         ))}
//         </Table>
//         <TablePagination
//               rowsPerPageOptions={[10, 25, 100]}
//               component={Paper}
//               count={data.numberOfDishes ? data.numberOfDishes : 1000}
//               rowsPerPage={dishRowsPerPage}
//               page={page}
//               onPageChange={handleChangePage}
//               onRowsPerPageChange={handleChangeRowsPerPage}
//             />
//       </TableContainer>
//   )
// }

// const Row = ({courses, data, setDish}: {courses: menu_menu_courses_course[],data: dishes_dishes, setDish: (a) => void}) => {

//   const formState: recipeToQ = {
//   name: data.name,
//   id: data.id,
//   quantity: '',
//   unit: ''
// }
// const  [open, setOpen] = useState<boolean>(false)

//   return (
//     <Formik
//         initialValues={formState}
//         onSubmit={(values) => {
//           setDish(values);
//         }}
//       >
//         {({ setFieldValue, submitForm }) => {
//       return (
//         <>
//         <TableRow >
//           <TableCell >
//             {data.name}
//           </TableCell>
//           <TableCell >
//             {data.theme}
//           </TableCell>
//           <TableCell>
//           <Button
//                   onClick={() => {setOpen(true)}}
//                   color="primary"
//                   variant="outlined"
//                 >
//                   +
//                 </Button>
//           </TableCell>
//         </TableRow>
//         <Dialog open={open} onClose={() => setOpen(false)}>
//                 <DialogActions>
//                   <Grid xs={12}><Button
//                   onClick={() => {setOpen(false)}}
//                   color="primary"
//                   variant="outlined"
//                 >
//                   Terug</Button></Grid>
//                 </DialogActions>
//               <DialogContent>
//                 <Table>
//                   <TableHead>
//                   <TableCell>Gang</TableCell>
//                     </TableHead>
//                     <TableRow>
//                         <TableCell>
//                         <FormikSelect
//                       name="course.id"
//                       >
//               {courses.map((course) => (
//                 <MenuItem key={course.id} value={course.id}>{course.courseType}</MenuItem>
//               ))}
//             </FormikSelect>
//                         </TableCell>
//                         <TableCell>
//                         <Button
//                   onClick={() => {
//                     submitForm();
//                     setOpen(false)}}
//                   color="primary"
//                   variant="outlined">Voeg Toe</Button>
//                         </TableCell>
//                   </TableRow>
//                   </Table>
//                       <Grid container spacing={2} xs={12}>
//               <Grid  item xs={6}>
//               </Grid>
//               <Grid  item xs={6}>
              
//               </Grid>
//                </Grid>
//               </DialogContent>
//         </Dialog>
//       </>
//       )
//         }
//       }
//       </Formik>
//   )
// }
