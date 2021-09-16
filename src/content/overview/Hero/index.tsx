import {
  Box,
  Button,
  Container,
  Grid,
  Typography
} from '@material-ui/core';

import { Link as RouterLink } from 'react-router-dom';

import { experimentalStyled } from '@material-ui/core/styles';

const TypographyH1 = experimentalStyled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(50)};
`
);

const TypographyH2 = experimentalStyled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(17)};
`
);

const LabelWrapper = experimentalStyled(Box)(
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

const MuiAvatar = experimentalStyled(Box)(
  ({ theme }) => `
    width: ${theme.spacing(8)};
    height: ${theme.spacing(8)};
    border-radius: ${theme.general.borderRadius};
    background-color: #e5f7ff;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto ${theme.spacing(2)};

    img {
      width: 60%;
      height: 60%;
      display: block;
    }
`
);

const TsAvatar = experimentalStyled(Box)(
  ({ theme }) => `
    width: ${theme.spacing(8)};
    height: ${theme.spacing(8)};
    border-radius: ${theme.general.borderRadius};
    background-color: #dfebf6;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto ${theme.spacing(2)};

    img {
      width: 60%;
      height: 60%;
      display: block;
    }
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
          <Button
            component={RouterLink}
            to="/dashboards/crypto"
            size="large"
            variant="contained"
          >
            Log In
          </Button> 
          
          <Button
            sx={{ ml: 2 }}
            component="a"
            target="_blank"
            rel="noopener"
            href="https://bloomui.com/product/tokyo-free-white-react-typescript-material-ui-admin-dashboard"
            size="large"
            variant="text"
          >
            Sign Up!
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Hero;
