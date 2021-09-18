import React from "react"
import MenuIcon from '@material-ui/icons/Menu';
import { Button, IconButton } from "@material-ui/core";
import { DarkGreenColor } from "../layout/Colors";
import { createTheme } from "@material-ui/core";
import { green } from "@material-ui/core/colors";

export const MenuButton = ({ onClick }: {onClick: () => void}) => {
    return (
        <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={onClick}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
    )
}

export const ItemButton = ({text, onClick}: {text: string, onClick: () => void}) => {
    return (
    <Button 
    color="primary"
    onClick={onClick}>
    {text}
    </Button>
    )
}