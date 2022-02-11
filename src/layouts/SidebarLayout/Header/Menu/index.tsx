import {
  Avatar,
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
  useTheme
} from '@material-ui/core';
import React, { useRef, useState } from 'react';


import { NavLink } from 'react-router-dom';
import { experimentalStyled } from '@material-ui/core/styles';
import ExpandMoreTwoToneIcon from '@material-ui/icons/ExpandMoreTwoTone';
import { useViewerQuery } from 'src/content/pages/MyChefsbase/api';
import { LoadingScreen } from 'src/components/layout';
import { User } from 'src/content/pages/MyChefsbase';

const ListWrapper = experimentalStyled(Box)(
  ({ theme }) => `
        .MuiTouchRipple-root {
            display: none;
        }
        
        .MuiListItem-root {
            transition: ${theme.transitions.create(['color', 'fill'])};
            
            &.MuiListItem-indicators {
                padding: ${theme.spacing(1, 2)};
            
                .MuiListItemText-root {
                    .MuiTypography-root {
                        &:before {
                            height: 4px;
                            width: 22px;
                            opacity: 0;
                            visibility: hidden;
                            display: block;
                            position: absolute;
                            bottom: -10px;
                            transition: all .2s;
                            border-radius: ${theme.general.borderRadiusLg};
                            content: "";
                            background: ${theme.colors.primary.main};
                        }
                    }
                }

                &.active,
                &:active,
                &:hover {
                
                    background: transparent;
                
                    .MuiListItemText-root {
                        .MuiTypography-root {
                            &:before {
                                opacity: 1;
                                visibility: visible;
                                bottom: 0px;
                            }
                        }
                    }
                }
            }
        }
`
);

const HeaderMenu = ({user}: {user:  User}) => {

  const theme  = useTheme()
  return (
    <>
    <Grid item>
        <Avatar
          sx={{ mr: 2, width: theme.spacing(8), height: theme.spacing(8) }}
          variant="rounded"
          alt={user.name}
          src={user.avatar}
        />
      </Grid>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
        {user.title}
        </Typography>
      </Grid>
    </>
  );
}

export default HeaderMenu;
