import { Button } from "@material-ui/core";
import React from "react"
import ThemeProvider from "src/theme/ThemeProvider";

export const ItemButton = ({disabled, text, onClick}: {disabled: boolean, text: string, onClick: () => void}) => {
    return (
        <ThemeProvider>
    <Button 
    variant="contained"
    disabled={disabled}
    fullWidth={true}
    color="secondary"
    onClick={onClick}>
    {text}
    </Button>
    </ThemeProvider>
    )
}