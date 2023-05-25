import { Grid, Container, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import PageHeader from './PageHeader';

function DatabaseTable() {
  const { sensorName } = useParams();
  const navigate = useNavigate();

  const apiURL = (sensorName === "temperature") ? "http://localhost:3000/sensor/temperature"
    : (sensorName === "humidity" ? "http://localhost:3000/sensor/humidity"
      : "http://localhost:3000/sensor/pressure");

  const name = (sensorName === "temperature") ? "Temperature" : (sensorName === "humidity" ? "Humidity" : "Pressure");

  const handleBackButton = () => {
    navigate(`/`)
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 130 },
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'time', headerName: 'Time', width: 150 },
    { field: `${sensorName}`, headerName: `${name}`, width: 150 },
  ];

  const [data, setData] = useState([]);

  const loadSensors = async () => {
    const res = await fetch(apiURL);
    const resData = await res.json();

    const formattedData = resData.map((row, index) => {
      const timestamp = new Date(parseInt(row.timestamp));
      const date = `${timestamp.getDate().toString().padStart(2, '0')}/${(timestamp.getMonth() + 1).toString().padStart(2, '0')}/${timestamp.getFullYear()}`;
      const time = `${timestamp.getHours().toString().padStart(2, '0')}:${timestamp.getMinutes().toString().padStart(2, '0')}:${timestamp.getSeconds().toString().padStart(2, '0')}`;

      // Create an object with dynamic keys based on the sensorName
      const rowData: {
        id: number;
        date: string;
        time: string;
        temperature?: number;
        humidity?: number;
        pressure?: number;
      } = {
        id: index + 1,
        date,
        time,
      };

      // Set the value of the appropriate sensor field
      if (sensorName === 'temperature') {
        rowData.temperature = row.temperature;
      } else if (sensorName === 'humidity') {
        rowData.humidity = row.humidity;
      } else if (sensorName === 'pressure') {
        rowData.pressure = row.pressure;
      }

      return rowData;
    });

    setData(formattedData);
  }

  useEffect(() => {
    loadSensors();
  }, []);

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
