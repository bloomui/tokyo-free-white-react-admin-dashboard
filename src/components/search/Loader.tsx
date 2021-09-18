import React from "react";
import { Fade, LinearProgress } from "@material-ui/core";

export const Loader = ({ loading }: {loading: boolean}) => (
  <div style={{ height: "20px", width: "100%" }}>
    {loading && (
      <Fade
        in={loading}
        style={{
          transitionDelay: loading ? "600ms" : "0ms",
        }}
        unmountOnExit
      >
        <LinearProgress />
      </Fade>
    )}
  </div>
);