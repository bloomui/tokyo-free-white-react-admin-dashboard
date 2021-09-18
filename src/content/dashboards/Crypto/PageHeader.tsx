import { Typography, Avatar, Grid } from '@material-ui/core';


import { useTheme } from '@material-ui/core/styles';

function PageHeader() {

  const user =
  {
    name: 'Soup Bros',
    avatar: '/static/images/avatars/SB_logo.png'
  };
  const theme = useTheme();

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Avatar
          sx={{ mr: 2, width: theme.spacing(8), height: theme.spacing(8) }}
          variant="rounded"
          alt={user.name}
          src={user.avatar}
        />
      </Grid>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
        Let's check the {user.name} Chefsbase!
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
