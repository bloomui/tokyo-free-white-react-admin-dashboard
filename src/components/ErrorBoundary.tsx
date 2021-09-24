import React, { ReactNode } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Box } from "@material-ui/core";
import { CenterInScreen } from "./layout";

type State = { hasError: boolean };

type Props = { children: ReactNode };

export default class ErrorBoundary extends React.Component<Props, State> {
  state = { hasError: false };

  componentDidCatch(error: Error, info: any) {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorMessage />;
    }
    return this.props.children;
  }
}

const ErrorMessage = () => (
  <CenterInScreen>
    <div style={{ textAlign: "center" }}>
      <Typography variant="h5">
        Er is iets fout gegaan, probeer het opnieuw.
      </Typography>
      <Box mt={3} />
      <Button variant="outlined" onClick={() => window.location.reload()}>
        Opnieuw proberen
      </Button>
    </div>
  </CenterInScreen>
);