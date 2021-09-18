import {
    Box,
    CircularProgress,
    Grid,
    Typography,
  } from "@material-ui/core";
  import React, { ReactNode } from "react";
  import SearchIcon from "@material-ui/icons/Search";
  import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import { withStyles } from "@material-ui/styles";
  
  export const CenterInScreen = (props: { children: ReactNode }) => {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        {props.children}
      </Box>
    );
  };
  
  export const LoadingScreen = () => (
    <CenterInScreen>
      <CircularProgress />
    </CenterInScreen>
  );
  
  export const ParticipantWrapper = (props: { children: ReactNode }) => {
    return (
      <Box width="70%" margin="0 auto">
        <ParticipantHeader />
        {props.children}
      </Box>
    );
  };
  
  export const CenteredWrapper = (props: { children: ReactNode }) => {
    return (
      <Box width="70%" margin="0 auto">
        {props.children}
      </Box>
    );
  };
  
  const ParticipantHeader = () => {
    const CustomerInitialTypography = withStyles({
      root: {
        position: "absolute",
        color: "white",
        top: "15%",
        left: "35%",
        fontSize: "1.1rem",
      },
    })(Typography);
  
    return (
      <>
        <Grid
          container
          direction="row"
          alignItems="center"
          item
          xs={12}
          style={{
            margin: "0 auto",
            paddingTop: "1rem",
            paddingBottom: "1rem",
          }}
        >
          <Grid item xs={10}>
            "My Chefsbase Logo"
          </Grid>
          <Grid
            container
            item
            direction="row"
            alignItems="center"
            xs={2}
          >
            <SearchIcon fontSize="large" />
            <NotificationsNoneIcon fontSize="large" />
            <Box
              borderRadius="50%"
              bgcolor="black"
              width="35px"
              height="35px"
              position="relative"
            >
              <CustomerInitialTypography>J</CustomerInitialTypography>
            </Box>
          </Grid>
        </Grid>
      </>
    );
  };