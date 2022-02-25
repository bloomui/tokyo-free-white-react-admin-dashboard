import { Snackbar, IconButton } from "@material-ui/core";
import React from "react";
import { ReactNode, useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
export const ErrorContext = React.createContext<(message?: string) => void>(
  (message) => {}
);

export const ErrorProvider = (props: { children: ReactNode }) => {
  const [message, setMessage] = useState<string | null>(null);

  const handleClose = () => setMessage(null);

  return (
    <ErrorContext.Provider
      value={(message) => {
        if (message != null) setMessage(message);
        else setMessage("Er is een fout opgetreden");
      }}
    >
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={message != null}
        onClose={handleClose}
        message={message}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
      {props.children}
    </ErrorContext.Provider>
  );
};

export const ErrorConsumer = ErrorContext.Consumer;
