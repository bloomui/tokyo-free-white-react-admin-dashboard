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
import { useSignUp, useUpdateAccount } from 'src/utilities/api';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import { updateAccountVariables } from 'src/utilities/types/updateAccount';

const SignUpForm = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  
  const navigate = useNavigate()
  
  const { signUp, loading, error } = useSignUp({
    onCompleted: () => {navigate('/authorize/SignIn')}
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
                <Grid item xs={6} sm={6}>
                  <TextField
                  name="location"
                  id="location"
                  label="Locatie"
                  fullWidth
                  onChange={(e) => setLocation(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <TextField
                  multiline
                  name="fullName"
                  id="fullName"
                  label="Naam eigenaar"
                  fullWidth
                  onChange={(e) => setFullName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <TextField
                  multiline
                  name="restaurantName"
                  id="restaurantName"
                  label="Naam restaurant"
                  fullWidth
                  onChange={(e) => setRestaurantName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6} sm={12}>
                  <TextField
                  multiline
                  name="description"
                  id="description"
                  label="Beschrijving"
                  fullWidth
                  onChange={(e) => setDescription(e.target.value)}
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
                  password: password,
                  fullName: fullName,
                  restaurantName: restaurantName,
                  description: description,
                  location: location
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