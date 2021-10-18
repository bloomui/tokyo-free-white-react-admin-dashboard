import { Card, Box, Typography, Avatar } from '@mui/material';

import { styled } from '@mui/material/styles';
import Label from 'src/components/Label';
import Text from 'src/components/Text';
import WatchListColumn1Chart from './WatchListColumn1Chart';

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
        background: transparent;
        margin-right: ${theme.spacing(0.5)};
`
);

const WatchListColumn1ChartWrapper = styled(WatchListColumn1Chart)(
  ({ theme }) => `
        height: 130px;
`
);

function WatchListColumn3() {

  const price = {
    week: {
      labels: [
        'Monday',
        'Tueday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ],
      data: [13, 16, 14, 21, 8, 11, 20]
    }
  };

  return (
    <Card>
      <Box sx={{ p: 3 }}>
        <Box display="flex" alignItems="center">
          <AvatarWrapper>
            <img alt="ADA" src="/static/images/placeholders/logo/cardano.png" />
          </AvatarWrapper>
          <Box>
            <Typography variant="h4" noWrap>
              Cardano
            </Typography>
            <Typography variant="subtitle1" noWrap>
              ADA
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
          <Typography variant="h2" sx={{ pr: 1, mb: 1 }}>
            $23.00
          </Typography>
          <Text color="error">
            <b>-0.33%</b>
          </Text>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start'
          }}
        >
          <Label color="error">-$5</Label>
          <Typography variant="body2" color="text.secondary" sx={{ pl: 1 }}>
            last 24h
          </Typography>
        </Box>
      </Box>
      <Box height={130} sx={{ ml: -1.5 }}>
        <WatchListColumn1ChartWrapper
          data={price.week.data}
          labels={price.week.labels}
        />
      </Box>
    </Card>
  );
}

export default WatchListColumn3;
