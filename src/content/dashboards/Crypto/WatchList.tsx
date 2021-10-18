import { MouseEvent, useState } from 'react';
import {
  Button,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Grid,
  Card,
  Typography
} from '@mui/material';

import { styled } from '@mui/material/styles';
import ViewWeekTwoToneIcon from '@mui/icons-material/ViewWeekTwoTone';
import TableRowsTwoToneIcon from '@mui/icons-material/TableRowsTwoTone';
import WatchListColumn1 from './WatchListColumn1';
import WatchListColumn2 from './WatchListColumn2';
import WatchListColumn3 from './WatchListColumn3';
import WatchListRow from './WatchListRow';

const EmptyResultsWrapper = styled('img')(
  ({ theme }) => `
      max-width: 100%;
      width: ${theme.spacing(66)};
      height: ${theme.spacing(34)};
`
);

function WatchList() {

  const [tabs, setTab] = useState<string | null>('watch_list_columns');

  const handleViewOrientation = (
    event: MouseEvent<HTMLElement>,
    newValue: string | null
  ) => {
    setTab(newValue);
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{ pb: 3 }}
      >
        <Typography variant="h3">Watch List</Typography>
        <ToggleButtonGroup
          value={tabs}
          exclusive
          onChange={handleViewOrientation}
        >
          <ToggleButton disableRipple value="watch_list_columns">
            <ViewWeekTwoToneIcon />
          </ToggleButton>
          <ToggleButton disableRipple value="watch_list_rows">
            <TableRowsTwoToneIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={3}
      >
        {tabs === 'watch_list_columns' && (
          <>
            <Grid item lg={4} xs={12}>
              <WatchListColumn1 />
            </Grid>
            <Grid item lg={4} xs={12}>
              <WatchListColumn2 />
            </Grid>
            <Grid item lg={4} xs={12}>
              <WatchListColumn3 />
            </Grid>
          </>
        )}

        {tabs === 'watch_list_rows' && (
          <Grid item xs={12}>
            <WatchListRow />
          </Grid>
        )}

        {!tabs && (
          <Grid item xs={12}>
            <Card sx={{ textAlign: 'center', p: 3 }}>
              <EmptyResultsWrapper src="/static/images/placeholders/illustrations/1.svg" />

              <Typography
                align="center"
                variant="h2"
                fontWeight="normal"
                color="text.secondary"
                sx={{ mt: 3 }}
                gutterBottom
              >
                Click something, anything!
              </Typography>
              <Button variant="contained" size="large" sx={{ mt: 4 }}>
                Maybe, a button?
              </Button>
            </Card>
          </Grid>
        )}
      </Grid>
    </>
  );
}

export default WatchList;
