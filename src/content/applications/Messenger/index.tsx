import { useEffect, useRef } from 'react';

import { Helmet } from 'react-helmet-async';

import TopBarContent from './TopBarContent';
import BottomBarContent from './BottomBarContent';
import SidebarContent from './SidebarContent';
import ChatContent from './ChatContent';

import { Scrollbars } from 'react-custom-scrollbars-2';

import { Box } from '@material-ui/core';
import { experimentalStyled } from '@material-ui/core/styles';

const RootWrapper = experimentalStyled(Box)(
  () => `
       height: 100%;
       display: flex;
`
);

const Sidebar = experimentalStyled(Box)(
  ({ theme }) => `
        width: 300px;
        background: ${theme.colors.alpha.white[100]};
        border-right: ${theme.colors.alpha.black[10]} solid 1px;
`
);

const ChatWindow = experimentalStyled(Box)(
  () => `
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        flex: 1;
`
);

const ChatTopBar = experimentalStyled(Box)(
  ({ theme }) => `
        background: ${theme.colors.alpha.white[100]};
        border-bottom: ${theme.colors.alpha.black[10]} solid 1px;
        padding: ${theme.spacing(3)};
`
);

const ChatMain = experimentalStyled(Box)(
  () => `
        flex: 1;
`
);

const ChatBottomBar = experimentalStyled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(3)};
`
);

function ApplicationsMessenger() {
  const ref = useRef<any>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollToBottom();
    }
  });

  return (
    <>
      <Helmet>
        <title>Messenger - Applications</title>
      </Helmet>
      <RootWrapper>
        <Sidebar>
          <Scrollbars autoHide>
            <SidebarContent />
          </Scrollbars>
        </Sidebar>
        <ChatWindow>
          <ChatTopBar>
            <TopBarContent />
          </ChatTopBar>
          <ChatMain>
            <Scrollbars ref={ref} autoHide>
              <ChatContent />
            </Scrollbars>
          </ChatMain>
          <ChatBottomBar>
            <BottomBarContent />
          </ChatBottomBar>
        </ChatWindow>
      </RootWrapper>
    </>
  );
}

export default ApplicationsMessenger;
