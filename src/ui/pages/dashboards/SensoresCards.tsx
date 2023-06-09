import {
  Card,
  Box,
  Typography,
  Avatar,
  Grid,
  alpha,
  useTheme,
  styled
} from '@mui/material';
import Label from 'src/ui/components/Label';
import Text from 'src/ui/components/Text';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import SpeedIcon from '@mui/icons-material/Speed';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
    margin: ${theme.spacing(0, 0, 1, -0.5)};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: ${theme.spacing(1)};
    padding: ${theme.spacing(0.5)};
    border-radius: 60px;
    height: ${theme.spacing(5.5)};
    width: ${theme.spacing(5.5)};
    background: ${theme.palette.mode === 'dark'
      ? theme.colors.alpha.trueWhite[30]
      : alpha(theme.colors.alpha.black[100], 0.07)
    };
  
    img {
      background: ${theme.colors.alpha.trueWhite[100]};
      padding: ${theme.spacing(0.5)};
      display: block;
      border-radius: inherit;
      height: ${theme.spacing(4.5)};
      width: ${theme.spacing(4.5)};
    }
`
);

function SensoresListColumn() {
  const theme = useTheme();

  const [openTable, setOpenTable] = useState(false);

  const [currentTemperature, setCurrentTemperature] = useState(0);
  const [currentPressure, setCurrentPressure] = useState(0);
  const [currentHumidity, setCurrentHumidity] = useState(0);

  const [yesterdayTemperature, setYesterdayTemperature] = useState(0);
  const [yesterdayPressure, setYesterdayPressure] = useState(0);
  const [yesterdayHumidity, setYesterdayHumidity] = useState(0);

  const [weekTemperature, setWeekTemperature] = useState([]);
  const [weekHumidity, setWeekHumidity] = useState([]);
  const [weekPressure, setWeekPressure] = useState([]);
  const [weekDays, setWeekDays] = useState([]);

  const apiURLCurrent = "http://localhost:3000/sensor/latest";
  const apiURLYesterday = "http://localhost:3000/sensor/yesterday";
  const apiURLWeek = "http://localhost:3000/sensor/last-week";

  const loadCurrentSensors = async () => {
    const res = await fetch(apiURLCurrent);
    const resData = await res.json();

    const row = resData[0];

    const rowData: {
      id: number;
      timestamp: number;
      temperature: number;
      humidity: number;
      pressure: number;
    } = {
      id: 1,
      timestamp: row.timestamp,
      temperature: parseFloat(row.temperature),
      humidity: parseFloat(row.humidity),
      pressure: parseFloat(row.pressure)
    };

    setCurrentTemperature(rowData.temperature);
    setCurrentHumidity(rowData.humidity);
    setCurrentPressure(rowData.pressure);
  };

  const loadYesterdaySensors = async () => {
    const res = await fetch(apiURLYesterday);
    const resData = await res.json();

    const row = resData[0];

    const rowData: {
      id: number;
      timestamp: number;
      temperature: number;
      humidity: number;
      pressure: number;
    } = {
      id: 1,
      timestamp: row.timestamp,
      temperature: parseFloat(row.temperature),
      humidity: parseFloat(row.humidity),
      pressure: parseFloat(row.pressure)
    };

    setYesterdayTemperature(rowData.temperature);
    setYesterdayHumidity(rowData.humidity);
    setYesterdayPressure(rowData.pressure);
  }

  const loadWeekSensors = async () => {
    const res = await fetch(apiURLWeek);
    const resData = await res.json();

    const formattedData = resData.map((row, index) => ({
      id: index + 1,
      date: row.date,
      temperature: row.average_temperature,
      humidity: row.average_humidity,
      pressure: row.average_pressure
    }));


    setWeekTemperature(prevWeekTemperature =>
      formattedData.map(data => data.temperature)
    );

    setWeekHumidity(prevWeekHumidity =>
      formattedData.map(data => data.humidity)
    );

    setWeekPressure(prevWeekPressure =>
      formattedData.map(data => data.pressure)
    );

    setWeekDays(formattedData.map(data => data.date));
  };

  useEffect(() => {
    const loadData = async () => {
      await loadCurrentSensors();
      await loadYesterdaySensors();
      await loadWeekSensors();
    };

    loadData();

    const interval = setInterval(() => {
      loadData();
    }, 900000);

    return () => {
      clearInterval(interval);
    };
  }, []);


  const navigate = useNavigate();

  const handleOnClick = (name: String) => {
    setOpenTable(!openTable);
    navigate(`db-t/${name}`);
  };

  const calculatePercentageDifference = (current: number, yesterday: number) => {
    const difference = current - yesterday;
    const percentageDifference = (difference / yesterday) * 100;

    if (percentageDifference === 0) {
      return '0%';
    }

    const sign = difference >= 0 ? '+' : '-';

    return `${sign}${Math.abs(percentageDifference).toFixed(2)}%`;
  };

  const getLabelColor = (current: number, yesterday: number) => {
    const percentageDifference = (current - yesterday) / yesterday;

    if (percentageDifference > 0) {
      return 'success';
    } else if (percentageDifference < 0) {
      return 'error';
    }

    return 'warning';
  };

  const chartOptions: ApexOptions = {
    chart: {
      background: 'transparent',
      toolbar: {
        show: false
      },
      sparkline: {
        enabled: false
      },
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      show: true,
      colors: [theme.colors.primary.main],
      width: 3
    },
    yaxis: {
      show: true,
      tickAmount: 5,
      labels: {
        style: {
          fontSize: '10px'
        },formatter: function (value: string | number) {
          const numericValue = typeof value === 'string' ? parseFloat(value) : value;
          return numericValue.toFixed(2);
        },
      },
    },
    tooltip: {
      x: {
        show: false
      },
      y: {
        formatter: undefined,
          title: {
              formatter: (seriesName) => "",
          },
      },
      marker: {
        show: false
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
    theme: {
      mode: theme.palette.mode
    },
    legend: {
      show: false
    },
    grid: {
      show: false
    }
  };

  const chartOptions1 = {
    xaxis: {
      categories: weekDays.map((day) => day.replace(/-\d{4}$/, '')),
      labels: {
        show: true,
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
    },
    ...chartOptions
  };
  
  const chartOptions2 = {
    xaxis: {
      categories: weekDays.map((day) => day.replace(/-\d{4}$/, '')),
      labels: {
        show: true,
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
    },
    ...chartOptions
  };
  
  const chartOptions3 = {
    xaxis: {
      categories: weekDays.map((day) => day.replace(/-\d{4}$/, '')),
      labels: {
        show: true,
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
    },
    ...chartOptions
  };

  return !openTable ? (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="stretch"
      spacing={3}
    >
      <Grid item md={4} xs={12}>
        {/* temperatura */}
        <Card
          sx={{
            overflow: 'visible',
            cursor: 'pointer'
          }}
          onClick={() => handleOnClick('temperature')}
        >
          <Box
            sx={{
              p: 3
            }}
          >
            <Box display="flex" alignItems="center">
              <AvatarWrapper>
                <ThermostatIcon color="primary" />
              </AvatarWrapper>
              <Box>
                <Typography variant="h4" noWrap>
                  Temperatura
                </Typography>
                <Typography variant="subtitle1" noWrap>
                  ºC
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                pt: 3
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  pr: 1,
                  mb: 1
                }}
              >
                {currentTemperature}º
              </Typography>
              <Text color={getLabelColor(currentTemperature, yesterdayTemperature)}>
                <b>{calculatePercentageDifference(currentTemperature, yesterdayTemperature)}</b>
              </Text>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start'
              }}
            >
              <Label color={getLabelColor(currentTemperature, yesterdayTemperature)}>{yesterdayTemperature}º</Label>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  pl: 1
                }}
              >
                ayer a esta hora
              </Typography>
            </Box>
          </Box>
          <Chart
            options={chartOptions1}
            series={[{ data: weekTemperature }]}
            type="area"
            height={200}
          />
        </Card>
      </Grid>
      <Grid item md={4} xs={12}>
        {/* humedad */}
        <Card
          sx={{
            overflow: 'visible',
            cursor: 'pointer'
          }}
          onClick={() => handleOnClick('humidity')}
        >
          <Box
            sx={{
              p: 3
            }}
          >
            <Box display="flex" alignItems="center">
              <AvatarWrapper>
                <InvertColorsIcon color="primary" />
              </AvatarWrapper>
              <Box>
                <Typography variant="h4" noWrap>
                  Humedad
                </Typography>
                <Typography variant="subtitle1" noWrap>
                  %º
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                pt: 3
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  pr: 1,
                  mb: 1
                }}
              >
                {currentHumidity}%
              </Typography>
              <Text color={getLabelColor(currentHumidity, yesterdayHumidity)}>
                <b>{calculatePercentageDifference(currentHumidity, yesterdayHumidity)}</b>
              </Text>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start'
              }}
            >
              <Label color={getLabelColor(currentHumidity, yesterdayHumidity)}>{yesterdayHumidity}%</Label>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  pl: 1
                }}
              >
                ayer a esta hora
              </Typography>
            </Box>
          </Box>
          <Chart
            options={chartOptions2}
            series={[{ data: weekHumidity }]}
            type="area"
            height={200}
          />
        </Card>
      </Grid>
      <Grid item md={4} xs={12}>
        {/* presion */}
        <Card
          sx={{
            overflow: 'visible',
            cursor: 'pointer'
          }}
          onClick={() => handleOnClick('pressure')}
        >
          <Box
            sx={{
              p: 3
            }}
          >
            <Box display="flex" alignItems="center">
              <AvatarWrapper>
                <SpeedIcon color="primary" />
              </AvatarWrapper>
              <Box>
                <Typography variant="h4" noWrap>
                  Presión
                </Typography>
                <Typography variant="subtitle1" noWrap>
                  mbar
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                pt: 3
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  pr: 1,
                  mb: 1
                }}
              >
                {currentPressure} mbar
              </Typography>
              <Text color={getLabelColor(currentPressure, yesterdayPressure)}>
                <b>{calculatePercentageDifference(currentPressure, yesterdayPressure)}</b>
              </Text>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start'
              }}
            >
              <Label color={getLabelColor(currentPressure, yesterdayPressure)}>{yesterdayPressure} mbar</Label>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  pl: 1
                }}
              >
                ayer a esta hora
              </Typography>
            </Box>
          </Box>
          <Chart
            options={chartOptions3}
            series={[{ data: weekPressure }]}
            type="area"
            height={200}
          />
        </Card>
      </Grid>
    </Grid>
  ) : (
    <></>
  );
}

export default SensoresListColumn;
