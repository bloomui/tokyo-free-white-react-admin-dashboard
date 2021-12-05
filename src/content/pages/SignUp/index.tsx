import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { LabelWrapper, TypographyH1, TypographyH2 } from 'src/content/overview/Hero';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSignUp } from 'src/utilities/api';

const SignUpForm = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate()

  
  const { signUp, loading, error } = useSignUp({
    onCompleted: () => {}
    // navigate('/authorize/SignIn')
    },
  );
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
        <CssBaseline />
        <>
          <Typography>
          Welcome to My Chefsbase!
          </Typography> 
            <Avatar >
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <form noValidate>
              <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                  <TextField
                  name="email"
                  id="email"
                  label="Email"
                  fullWidth
                  onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                  name="password"
                  id="password"
                  label="Wachtwoord"
                  type="password"
                  fullWidth
                  onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <Button
              onClick={() => signUp({
                variables: {
                  email: email,
                  password: password
                }
              })}
                 component={RouterLink}
                 to="/authorize/SignIn"
                 size="large"
                 variant="contained"
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                <Button
            component={RouterLink}
            to="/authorize/SignIn"
            size="large"
            variant="contained"
          >
            Al een account? Meld je aan!
            </Button>
                </Grid>
              </Grid>
            </form>
            </>
        </Grid>
      </Grid>
    </Container>
    );
}

export const HomeComponentsInCenterOfSpace = (
    {
        title
    }: {
    title: string;
}) => {
    return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <>
          <Typography>
          {title}
          </Typography> 
          </>
          </Container>
    )
}

export default SignUpForm;