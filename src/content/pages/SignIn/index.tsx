import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Checkbox, Container, CssBaseline, FormControlLabel, Grid } from '@material-ui/core';
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, useApolloClient, } from '@apollo/client';
import { useField } from 'formik';
import { Validator } from '../../../utilities/formikValidators';
import { formikFieldErrorProps } from '../../../utilities/formikError';
import { Link as RouterLink } from 'react-router-dom';
import { LabelWrapper, TypographyH1, TypographyH2 } from 'src/content/overview/Hero';
import { useLogin } from 'src/utilities/api';
import { useCookies } from 'react-cookie';
import {useNavigate} from 'react-router-dom';
import { setToken } from 'src/utilities/auth';

// export const getToken = () => {
//   const [cookies, setCookie, removeCookie] = useCookies(["accesstoken"]);
//   return (
//     cookies
//   )
// }

// export function useAuthToken(token: string) {
  
//   //we use react-cookies to access our cookies
//   const [cookies, setCookie, removeCookie] = useCookies([token]);
  
//   // this function allows to save any string in our cookies, under the key "authToken"
//   const setAuthToken = (authToken) => setCookie(token, authToken);
  
//   //this function removes the key "authToken" from our cookies. Useful to logout
//   const removeAuthToken = () => removeCookie(token);
  
//   return [cookies[token], setAuthToken, removeAuthToken];
// };

// const httpLink = new HttpLink({ uri: "http://localhost:9090/graphql" });

// const authMiddleware = (authToken) =>
//   new ApolloLink((operation, forward) => {
//     // add the authorization to the headers
//     if (authToken) {
//       operation.setContext({
//         headers: {
//           authorization: `${authToken}`,
//         },
//       });
//     }

//     return forward(operation);
//   });

// const cache = new InMemoryCache({});

// export const useAppApolloClient = (token: string) => {
//   const [authToken] = useAuthToken(token);
//   return new ApolloClient({
//     link: authMiddleware(authToken).concat(httpLink),
//     cache,
//   });
// };

const SignInForm = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();
 
  const { authenticateFn, loading } = useLogin(
    {
    onSuccess: (token: string | null) => {

      if (token == null) setLoginError(true)
      else {
        setToken(token)
               navigate(`/mychefsbase/chefsbase`);
      }
    },
  }
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
                  onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                  name="password"
                  id="password"
                  label="Wachtwoord"
                  fullWidth
                  onChange={(e) => setPassword(e.target.value)}
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
            // component={RouterLink}
            // to="/mychefsbase/chefsbase"
            size="large"
            variant="contained"
            onClick={async () => {

                const result = await authenticateFn({
                  variables: {
                    email,
                    password
                  }
                })





            }}
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
            {loginError  && ( <Typography color="error">Inloggen mislukt</Typography>)}
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