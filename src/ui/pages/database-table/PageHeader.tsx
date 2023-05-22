import { Typography, Button, Grid, Box } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

interface IRegister {
  sensorName: String;
}

function PageHeader(props: IRegister) {
  const { sensorName } = props;
  return (
    <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          pb: 3, pt: 3
        }}
      >
        <Typography variant="h3">{`Registros de ${sensorName}`}</Typography>
      </Box>
  );
}

export default PageHeader;
