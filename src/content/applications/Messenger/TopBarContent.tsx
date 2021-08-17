import { useState, SyntheticEvent } from 'react';
import {
  Box,
  IconButton,
  Tooltip,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
  Drawer,
  Divider,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@material-ui/core';

import { experimentalStyled } from '@material-ui/core/styles';
import { formatDistance, subMinutes } from 'date-fns';
import CallTwoToneIcon from '@material-ui/icons/CallTwoTone';
import VideoCameraFrontTwoToneIcon from '@material-ui/icons/VideoCameraFrontTwoTone';
import InfoTwoToneIcon from '@material-ui/icons/InfoTwoTone';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
import ColorLensTwoToneIcon from '@material-ui/icons/ColorLensTwoTone';
import NotificationsOffTwoToneIcon from '@material-ui/icons/NotificationsOffTwoTone';
import EmojiEmotionsTwoToneIcon from '@material-ui/icons/EmojiEmotionsTwoTone';
import CancelTwoToneIcon from '@material-ui/icons/CancelTwoTone';
import BlockTwoToneIcon from '@material-ui/icons/BlockTwoTone';
import WarningTwoToneIcon from '@material-ui/icons/WarningTwoTone';
import DescriptionTwoToneIcon from '@material-ui/icons/DescriptionTwoTone';

const RootWrapper = experimentalStyled(Box)(
  ({ theme }) => `
        @media (min-width: ${theme.breakpoints.values.md}px) {
          display: flex;
          align-items: center;
          justify-content: space-between;
      }
`
);

const ListItemIconWrapper = experimentalStyled(ListItemIcon)(
  ({ theme }) => `
        min-width: 36px;
        color: ${theme.colors.primary.light};
`
);

const AccordionSummaryWrapper = experimentalStyled(AccordionSummary)(
  ({ theme }) => `
        &.Mui-expanded {
          min-height: 48px;
        }

        .MuiAccordionSummary-content.Mui-expanded {
          margin: 12px 0;
        }

        .MuiSvgIcon-root {
          transition: ${theme.transitions.create(['color'])};
        }

        &.MuiButtonBase-root {

          margin-bottom: ${theme.spacing(0.5)};

          &:last-child {
            margin-bottom: 0;
          }

          &.Mui-expanded,
          &:hover {
            background: ${theme.colors.alpha.black[10]};

            .MuiSvgIcon-root {
              color: ${theme.colors.primary.main};
            }
          }
        }
`
);

function TopBarContent() {

  const theme = useTheme();

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [expanded, setExpanded] = useState<string | false>('section1');

  const handleChange = (section: string) => (
    event: SyntheticEvent,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? section : false);
  };

  return (
    <>
      <RootWrapper>
        <Box sx={{ display: { sm: 'flex' } }} alignItems="center">
          <Avatar
            variant="rounded"
            sx={{ width: 50, height: 50 }}
            alt="Zain Baptista"
            src="/static/images/avatars/2.jpg"
          />
          <Box sx={{ pl: { sm: 1.5 }, pt: { xs: 1.5, sm: 0 } }}>
            <Typography variant="h4" gutterBottom>
              Zain Baptista
            </Typography>
            <Typography variant="subtitle2">
              {formatDistance(subMinutes(new Date(), 8), new Date(), {
                addSuffix: true
              })}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            mt: { xs: 3, md: 0 }
          }}
        >
          <Tooltip placement="bottom" title="Start a voice call">
            <IconButton color="primary">
              <CallTwoToneIcon />
            </IconButton>
          </Tooltip>
          <Tooltip placement="bottom" title="Start a video call">
            <IconButton color="primary">
              <VideoCameraFrontTwoToneIcon />
            </IconButton>
          </Tooltip>
          <Tooltip placement="bottom" title="Conversation information">
            <IconButton color="primary" onClick={handleDrawerToggle}>
              <InfoTwoToneIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </RootWrapper>
      <Drawer
        variant="temporary"
        anchor={theme.direction === 'rtl' ? 'left' : 'right'}
        open={mobileOpen}
        onClose={handleDrawerToggle}
        elevation={9}
      >
        <Box sx={{ minWidth: 360 }} p={2}>
          <Box sx={{ textAlign: 'center' }}>
            <Avatar
              sx={{
                mx: 'auto',
                my: 2,
                width: theme.spacing(12),
                height: theme.spacing(12)
              }}
              variant="rounded"
              alt="Zain Baptista"
              src="/static/images/avatars/2.jpg"
            />
            <Typography variant="h4">Zain Baptista</Typography>
            <Typography variant="subtitle2">
              Active{' '}
              {formatDistance(subMinutes(new Date(), 7), new Date(), {
                addSuffix: true
              })}
            </Typography>
          </Box>
          <Divider sx={{ my: 3 }} />

          <Accordion
            expanded={expanded === 'section1'}
            onChange={handleChange('section1')}
          >
            <AccordionSummaryWrapper expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h5">Customize Chat</Typography>
            </AccordionSummaryWrapper>
            <AccordionDetails sx={{ p: 0 }}>
              <List component="nav">
                <ListItem button>
                  <ListItemIconWrapper>
                    <SearchTwoToneIcon />
                  </ListItemIconWrapper>
                  <ListItemText
                    primary="Search in Conversation"
                    primaryTypographyProps={{ variant: 'h5' }}
                  />
                </ListItem>
                <ListItem button>
                  <ListItemIconWrapper>
                    <ColorLensTwoToneIcon />
                  </ListItemIconWrapper>
                  <ListItemText
                    primary="Change Theme Styling"
                    primaryTypographyProps={{ variant: 'h5' }}
                  />
                </ListItem>
                <ListItem button>
                  <ListItemIconWrapper>
                    <EmojiEmotionsTwoToneIcon />
                  </ListItemIconWrapper>
                  <ListItemText
                    primary="Choose Default Emoji"
                    primaryTypographyProps={{ variant: 'h5' }}
                  />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === 'section2'}
            onChange={handleChange('section2')}
          >
            <AccordionSummaryWrapper expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h5">Privacy & Support</Typography>
            </AccordionSummaryWrapper>
            <AccordionDetails sx={{ p: 0 }}>
              <List component="nav">
                <ListItem button>
                  <ListItemIconWrapper>
                    <NotificationsOffTwoToneIcon />
                  </ListItemIconWrapper>
                  <ListItemText
                    primary="Turn off notifications"
                    primaryTypographyProps={{ variant: 'h5' }}
                  />
                </ListItem>
                <ListItem button>
                  <ListItemIconWrapper>
                    <CancelTwoToneIcon />
                  </ListItemIconWrapper>
                  <ListItemText
                    primary="Ignore all messages"
                    primaryTypographyProps={{ variant: 'h5' }}
                  />
                </ListItem>
                <ListItem button>
                  <ListItemIconWrapper>
                    <BlockTwoToneIcon />
                  </ListItemIconWrapper>
                  <ListItemText
                    primary="Block user"
                    primaryTypographyProps={{ variant: 'h5' }}
                  />
                </ListItem>
                <ListItem button>
                  <ListItemIconWrapper>
                    <WarningTwoToneIcon />
                  </ListItemIconWrapper>
                  <ListItemText
                    primary="Something's Wrong"
                    primaryTypographyProps={{ variant: 'h5' }}
                    secondary="Report the conversation and provide feedback"
                    secondaryTypographyProps={{ variant: 'subtitle1' }}
                  />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === 'section3'}
            onChange={handleChange('section3')}
          >
            <AccordionSummaryWrapper expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h5">Shared Files</Typography>
            </AccordionSummaryWrapper>
            <AccordionDetails sx={{ p: 0 }}>
              <List component="nav">
                <ListItem button>
                  <ListItemIconWrapper>
                    <DescriptionTwoToneIcon />
                  </ListItemIconWrapper>
                  <ListItemText
                    primary="HolidayPictures.zip"
                    primaryTypographyProps={{ variant: 'h5' }}
                    secondary="You opened in the past year"
                    secondaryTypographyProps={{ variant: 'subtitle1' }}
                  />
                </ListItem>
                <ListItem button>
                  <ListItemIconWrapper>
                    <DescriptionTwoToneIcon />
                  </ListItemIconWrapper>
                  <ListItemText
                    primary="2021Screenshot.jpg"
                    primaryTypographyProps={{ variant: 'h5' }}
                    secondary="You edited this file yesterday"
                    secondaryTypographyProps={{ variant: 'subtitle1' }}
                  />
                </ListItem>
                <ListItem button>
                  <ListItemIconWrapper>
                    <DescriptionTwoToneIcon />
                  </ListItemIconWrapper>
                  <ListItemText
                    primary="PresentationDeck.pdf"
                    primaryTypographyProps={{ variant: 'h5' }}
                    secondary="Never opened"
                    secondaryTypographyProps={{ variant: 'subtitle1' }}
                  />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Drawer>
    </>
  );
}

export default TopBarContent;
