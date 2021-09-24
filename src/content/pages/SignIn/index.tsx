import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Box, Checkbox, Container, CssBaseline, FormControlLabel, Grid, InputAdornment } from '@material-ui/core';
import IconButton from "@material-ui/core/IconButton";
import { useLazyQuery, useQuery } from '@apollo/client';
import { Form, Formik, useField } from 'formik';
import { composeValidators, required, Validator } from '../../../utilities/formikValidators';
import { formikFieldErrorProps } from '../../../utilities/formikError';
import { ItemButton } from 'src/components/buttons/ItemButton';
import { Link as RouterLink } from 'react-router-dom';
import { experimentalStyled } from '@material-ui/core/styles';
import { LabelWrapper, TypographyH1, TypographyH2 } from 'src/content/overview/Hero';

const SignInForm = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");

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
            <Typography component="h1" variant="h5">
              Log in
            </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                  name="email"
                  id="email"
                  label="Email"
                  fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                  name="password"
                  id="password"
                  label="Wachtwoord"
                  fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="Ik blijf graag op de hoogte van de nieuwste nieuwtjes van My Chefsbase."
                  />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                  <Button
            component={RouterLink}
            to="/mychefsbase/chefsbase"
            size="large"
            variant="contained"
          >
                Sign In
              </Button>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                  <Button
            component={RouterLink}
            to="/authenticate/SignUp"
            size="large"
            variant="contained"
          >
            Nog geen account? Meld je aan!
            </Button>
                </Grid>
                </Grid>
               </>
        </Grid>
      </Grid>
    </Container>
    );
       }

       export type FieldProps = {
        name: string;
        label: string;
        validator?: Validator;
        otherFieldProps?: Partial<TextFieldProps>;
      };
      
      export const FormField = (props: FieldProps) => {
        const { name, label, validator, otherFieldProps } = props;
      
        const [field, meta] = useField({
          name,
          validate: validator,
        });
      
        return (
          <TextField
            {...(otherFieldProps as any)}
            {...field}
            fullWidth
            {...formikFieldErrorProps(meta)}
            label={label}
          />
        );
      };
      
      export default SignInForm;