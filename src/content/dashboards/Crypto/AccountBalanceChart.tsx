import { FC } from 'react';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import { useTheme } from '@mui/material';

interface ChartProps {
  data: any;
}

const AccountBalanceChart: FC<ChartProps> = ({ data: dataProp, ...rest }) => {
  const theme = useTheme();

  const data = {
    datasets: dataProp.datasets.map((dataset) => ({
      ...dataset,
      borderWidth: 10,
      borderColor: theme.colors.alpha.white[100],
      hoverBorderColor: theme.colors.alpha.white[30]
    })),
    labels: dataProp.labels
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    cutoutPercentage: 60,
    legend: {
      display: false
    },
    layout: {
      padding: 0
    },
    tooltips: {
      enabled: true,
      caretSize: 6,
      displayColors: false,
      mode: 'label',
      intersect: true,
      yPadding: 8,
      xPadding: 16,
      borderWidth: 2,
      bodySpacing: 10,
      borderColor: theme.colors.alpha.black[30],
      backgroundColor: theme.palette.common.white,
      titleFontColor: theme.palette.common.black,
      bodyFontColor: theme.palette.common.black,
      footerFontColor: theme.palette.common.black,
      callbacks: {
        label(tooltipItem, _data) {
          const label = _data.labels[tooltipItem.index];
          const value = _data.datasets[0].data[tooltipItem.index];

          return `${label}: ${value}%`;
        }
      }
    }
  };

  return <Doughnut data={data} options={options} {...rest} />;
};

AccountBalanceChart.propTypes = {
  data: PropTypes.object.isRequired
};

export default AccountBalanceChart;
