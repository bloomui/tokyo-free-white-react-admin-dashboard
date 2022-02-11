import React, { useContext } from 'react';

import { Box, Hidden, IconButton, Tooltip } from '@material-ui/core';
import { experimentalStyled } from '@material-ui/core/styles';
import MenuTwoToneIcon from '@material-ui/icons/MenuTwoTone';
import { SidebarContext } from 'src/contexts/SidebarContext';
import CloseTwoToneIcon from '@material-ui/icons/CloseTwoTone';

import HeaderMenu from './Menu';
import HeaderButtons from './Buttons';
import HeaderUserbox from './Userbox';
import Logo from 'src/components/Logo';
import { useViewerQuery } from 'src/content/pages/MyChefsbase/api';
import { LoadingScreen } from 'src/components/layout';

const HeaderWrapper = experimentalStyled(Box)(
  ({ theme }) => `
        height: ${theme.header.height};
        color: ${theme.header.textColor};
        padding: ${theme.spacing(0, 2)};
        right: 0;
        z-index: 5;
        background-color: ${theme.header.background};
        box-shadow: ${theme.header.boxShadow};
        position: fixed;
        justify-content: space-between;
        width: 100%;
        @media (min-width: ${theme.breakpoints.values.lg}px) {
            left: ${theme.sidebar.width};
            width: auto;
        }
`
);

function Header() {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);

  const {data, loading, error} = useViewerQuery()


  if (loading) return <LoadingScreen />
    let user = {
      name: data.viewer.fullName,
      avatar: '/static/images/avatars/SB_logo.png',
      title: data.viewer.restaurantName
    }
  return (
    <HeaderWrapper display="flex" alignItems="center">
      <Box display="flex" alignItems="center">
        <Hidden lgUp>
          <Logo />
        </Hidden>
        <Hidden lgUp>
          <HeaderMenu user={user}/>
        </Hidden>
      </Box>
      <Box display="flex" alignItems="center">
        <HeaderButtons />
        <HeaderUserbox user={user}/>
        <Hidden lgUp>
          <Tooltip arrow title="Search">
            <IconButton color="primary" onClick={toggleSidebar}>
              {!sidebarToggle ? <MenuTwoToneIcon /> : <CloseTwoToneIcon />}
            </IconButton>
          </Tooltip>
        </Hidden>
      </Box>
    </HeaderWrapper>
  );
}

export default Header;
