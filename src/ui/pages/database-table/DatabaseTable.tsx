import { Grid, Container, Button, useTheme } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import PageHeader from './PageHeader';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

function DatabaseTable() {
  const [data, setData] = useState([]);
  const { sensorName } = useParams();
  const navigate = useNavigate();

  const theme = useTheme();

  const apiURL =
    sensorName === 'temperature'
      ? 'http://localhost:3000/sensor/temperature'
      : sensorName === 'humidity'
      ? 'http://localhost:3000/sensor/humidity'
      : 'http://localhost:3000/sensor/pressure';

  const name =
    sensorName === 'temperature'
      ? 'Temperature'
      : sensorName === 'humidity'
      ? 'Humidity'
      : 'Pressure';

  const handleBackButton = () => {
    navigate(`/`);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 130 },
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'time', headerName: 'Time', width: 150 },
    { field: `${sensorName}`, headerName: `${name}`, width: 150 }
  ];

  const loadSensors = async () => {
    const res = await fetch(apiURL);
    const resData = await res.json();

    const formattedData = resData.map((row, index) => {
      const timestamp = new Date(parseInt(row.timestamp));
      const date = `${timestamp.getDate().toString().padStart(2, '0')}/${(
        timestamp.getMonth() + 1
      )
        .toString()
        .padStart(2, '0')}/${timestamp.getFullYear()}`;
      const time = `${timestamp
        .getHours()
        .toString()
        .padStart(2, '0')}:${timestamp
        .getMinutes()
        .toString()
        .padStart(2, '0')}:${timestamp
        .getSeconds()
        .toString()
        .padStart(2, '0')}`;

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
        time
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
  };

  useEffect(() => {
    loadSensors();
  }, []);

  const chartOptions: ApexOptions = {
    chart: {
      background: 'transparent',
      toolbar: {
        show: false
      },
      sparkline: {
        enabled: true
      },
      zoom: {
        enabled: false
      }
    },
    fill: {
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.1,
        inverseColors: false,
        opacityFrom: 0.8,
        opacityTo: 0,
        stops: [0, 100]
      }
    },
    colors: [theme.colors.primary.main],
    dataLabels: {
      enabled: false
    },
    theme: {
      mode: theme.palette.mode
    },
    stroke: {
      show: true,
      colors: [theme.colors.primary.main],
      width: 3
    },
    legend: {
      show: false
    },
    xaxis: {
      labels: {
        show: false
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      categories: data.map((item) => item.date) // Set the x-axis categories from the date values
    },
    yaxis: {
      show: false,
      tickAmount: 5
    },
    tooltip: {
      x: {
        show: true
      },
      marker: {
        show: false
      }
    }
  };

  const seriesData = data.map((item) =>
    sensorName === 'temperature'
      ? item.temperature
      : sensorName === 'humidity'
      ? item.humidity
      : item.pressure
  );

  return (
    <>
      <Container maxWidth="lg">
        <Grid
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Grid item xs={6}>
            <PageHeader sensorName={sensorName} />
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained" onClick={handleBackButton}>
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
          <Grid item xs={12} sm={6}>
            <DataGrid
              rows={data}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 }
                }
              }}
              slots={{ toolbar: GridToolbar }}
              pageSizeOptions={[5, 10, 25, 50]}
              sx={{ background: 'white' }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Chart
              options={chartOptions}
              series={[{ data: seriesData }]}
              type="area"
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default DatabaseTable;
