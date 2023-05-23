import PageTitleWrapper from 'src/ui/components/PageTitleWrapper';
import { Grid, Container, Button } from '@mui/material';
import Footer from 'src/ui/components/Footer';
import PageHeader from './PageHeader';
import { useNavigate, useParams } from 'react-router-dom';
import { DataGrid, GridColDef, GridToolbar, GridValueGetterParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import mysql from 'mysql';

function DatabaseTable() {
  const { sensorName } = useParams();
  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate(`/`)
  }

  const columns: GridColDef[] = [
    { field: 'timestamp', headerName: 'ID', width: 130 },
    { field: `${sensorName}`, headerName: 'First name', width: 130 },
  ];

const [data, setData] = useState([]);

  useEffect(() => {
    // Configura los detalles de conexión a la base de datos
    const connection = mysql.createConnection({
      host: 'database-sensors.crxlhu9jcrhm.eu-west-1.rds.amazonaws.com',
      user: 'admin',
      password: 'admin123',
      database: 'database_sensors'
    });

    // Realiza la consulta a la base de datos y guarda los resultados en el estado 'data'
    const fetchData = async () => {
      connection.query(`SELECT timestamp, ? FROM sensors`, sensorName, (error, results) => {
        if (error) {
          console.error(error);
        } else {
          console.log(results)
        }
      });
    };

    // Establece la conexión a la base de datos y realiza la consulta
    connection.connect((error) => {
      if (error) {
        console.error('Error al conectar a la base de datos:', error);
      } else {
        fetchData();
      }
    });

    // Cierra la conexión cuando el componente se desmonta
    return () => {
      connection.end();
    };
  }, []);

  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];

  return (
    <>
      <Container maxWidth="lg">
        <Grid sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Grid item xs={6}>
            <PageHeader sensorName={sensorName} />
          </Grid>
          <Grid item xs={4}>
            <Button variant='contained' onClick={handleBackButton}>
              Volver
            </Button>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <DataGrid
              rows={data}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              slots={{ toolbar: GridToolbar }}
              pageSizeOptions={[5, 10]}
              sx={{ background: "white" }}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default DatabaseTable;
