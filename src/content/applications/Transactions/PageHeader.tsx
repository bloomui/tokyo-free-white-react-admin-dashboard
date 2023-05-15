import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

interface IRegister {
  sensorName: String;
}

function PageHeader(props: IRegister) {
  const { sensorName } = props;
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          {`Registros de ${sensorName}`}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
