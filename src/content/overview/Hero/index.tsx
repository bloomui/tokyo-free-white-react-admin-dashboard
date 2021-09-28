import {
  Box,
  Button,
  Container,
  Grid,
  Typography
} from '@material-ui/core';

import { Link as RouterLink } from 'react-router-dom';

import { experimentalStyled } from '@material-ui/core/styles';

export const TypographyH1 = experimentalStyled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(50)};
`
);

export const TypographyH2 = experimentalStyled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(17)};
`
);

export const LabelWrapper = experimentalStyled(Box)(
  ({ theme }) => `
    background-color: ${theme.colors.success.main};
    color: ${theme.palette.success.contrastText};
    font-weight: bold;
    border-radius: 30px;
    text-transform: uppercase;
    display: inline-block;
    font-size: ${theme.typography.pxToRem(11)};
    padding: ${theme.spacing(.5)} ${theme.spacing(1.5)};
    margin-bottom: ${theme.spacing(2)};
`
);

function Hero() {

  return (
    <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
      <Grid spacing={{ xs: 6, md: 10 }} justifyContent="center" alignItems="center" container>
        <Grid item md={10} lg={8} mx="auto">
          <LabelWrapper color="success">Version 1.0.0</LabelWrapper>
          <TypographyH1 sx={{ mb: 2 }} variant="h1">
          My Chefsbase
          </TypographyH1>
          <TypographyH2
            sx={{ lineHeight: 1.5, pb: 4 }}
            variant="h4"
            color="text.secondary"
            fontWeight="normal"
          > 
          Getting the best out of every chef!
          </TypographyH2>
          <Grid container spacing={2} xs={12}>
          <Grid item xs={6}>
          <Button
          fullWidth
            component={RouterLink}
            to="/authorize/signin"
            size="large"
            variant="contained"
          >
            Log In
          </Button> 
          </Grid>
          <Grid item xs={6}>
          <Button
            fullWidth
            component={RouterLink}
            to="/authenticate/signup"
            size="large"
            variant="contained"
          >
            Sign Up
          </Button> 
          </Grid>
          </Grid>
          {/* <Button
            sx={{ ml: 2 }}
            component="a"
            target="_blank"
            rel="noopener"
            href="https://bloomui.com/product/tokyo-free-white-react-typescript-material-ui-admin-dashboard"
            size="large"
            variant="text"
          >
            Sign Up!
          </Button> */}
        </Grid>
      </Grid>
    </Container>
  );
}

export default Hero;
