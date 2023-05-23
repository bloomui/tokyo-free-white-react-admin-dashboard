import { MouseEvent, useState } from 'react';
import {
  Button,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Card,
  Typography,
  styled
} from '@mui/material';
import SensoresListColumn from './SensoresListColumn';

const EmptyResultsWrapper = styled('img')(
  ({ theme }) => `
      max-width: 100%;
      width: ${theme.spacing(66)};
      height: ${theme.spacing(34)};
`
);

function SensoresList() {
  const [tabs, setTab] = useState<string | null>('sensores_list_columns');

  const handleViewOrientation = (
    _event: MouseEvent<HTMLElement>,
    newValue: string | null
  ) => {
    setTab(newValue);
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="left"
        justifyContent="space-between"
        flexDirection="column"
        sx={{
          pb: 3, pt: 3
        }}
      >
        <Typography variant="h3">Mis sensores</Typography>
        <br/>
        <Typography variant="h6">Haga click en una de las gráficas para ver todos los datos del sensor seleccionado</Typography>
        <ToggleButtonGroup
          value={tabs}
          exclusive
          onChange={handleViewOrientation}
        />
      </Box>
      <SensoresListColumn />
    </>
  );
}

export default SensoresList;
