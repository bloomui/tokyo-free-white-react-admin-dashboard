import { Typography, Avatar, Grid } from '@material-ui/core';


import { useTheme } from '@material-ui/core/styles';

export  const PageHeader = ({title, name, avatar}: {title: string, name: string, avatar: string | null}) => {

  
  const theme = useTheme();

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Avatar
          sx={{ mr: 2, width: theme.spacing(8), height: theme.spacing(8) }}
          variant="rounded"
          alt={name}
          src={avatar}
        />
      </Grid>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
        {title}
        </Typography>
      </Grid>
    </Grid>
  );
}

