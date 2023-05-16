import { Box, Avatar, Typography, Card, styled, Divider } from '@mui/material';

import {
  formatDistance,
  format,
  subDays,
  subHours,
  subMinutes
} from 'date-fns';
import ScheduleTwoToneIcon from '@mui/icons-material/ScheduleTwoTone';

const DividerWrapper = styled(Divider)(
  ({ theme }) => `
      .MuiDivider-wrapper {
        border-radius: ${theme.general.borderRadiusSm};
        text-transform: none;
        background: ${theme.palette.background.default};
        font-size: ${theme.typography.pxToRem(13)};
        color: ${theme.colors.alpha.black[50]};
      }
`
);

const CardWrapperPrimary = styled(Card)(
  ({ theme }) => `
      background: ${theme.colors.primary.main};
      color: ${theme.palette.primary.contrastText};
      padding: ${theme.spacing(2)};
      border-radius: ${theme.general.borderRadiusXl};
      border-top-right-radius: ${theme.general.borderRadius};
      max-width: 380px;
      display: inline-flex;
`
);

const CardWrapperSecondary = styled(Card)(
  ({ theme }) => `
      background: ${theme.colors.alpha.black[10]};
      color: ${theme.colors.alpha.black[100]};
      padding: ${theme.spacing(2)};
      border-radius: ${theme.general.borderRadiusXl};
      border-top-left-radius: ${theme.general.borderRadius};
      max-width: 380px;
      display: inline-flex;
`
);

function ChatContent() {
  const user = {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/1.jpg'
  };

  return (
    <Box p={3}>
      <DividerWrapper>
        {format(subDays(new Date(), 3), 'MMMM dd yyyy')}
      </DividerWrapper>

      <Box
        display="flex"
        alignItems="flex-start"
        justifyContent="flex-start"
        py={3}
      >
        <Avatar
          variant="rounded"
          sx={{
            width: 50,
            height: 50
          }}
          alt="Zain Baptista"
          src="/static/images/avatars/2.jpg"
        />
        <Box
          display="flex"
          alignItems="flex-start"
          flexDirection="column"
          justifyContent="flex-start"
          ml={2}
        >
          <CardWrapperSecondary>
            Hi. Can you send me the missing invoices asap?
          </CardWrapperSecondary>
          <Typography
            variant="subtitle1"
            sx={{
              pt: 1,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <ScheduleTwoToneIcon
              sx={{
                mr: 0.5
              }}
              fontSize="small"
            />
            {formatDistance(subHours(new Date(), 115), new Date(), {
              addSuffix: true
            })}
          </Typography>
        </Box>
      </Box>

      <Box
        display="flex"
        alignItems="flex-start"
        justifyContent="flex-end"
        py={3}
      >
        <Box
          display="flex"
          alignItems="flex-end"
          flexDirection="column"
          justifyContent="flex-end"
          mr={2}
        >
          <CardWrapperPrimary>
            Yes, I'll email them right now. I'll let you know once the remaining
            invoices are done.
          </CardWrapperPrimary>
          <Typography
            variant="subtitle1"
            sx={{
              pt: 1,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <ScheduleTwoToneIcon
              sx={{
                mr: 0.5
              }}
              fontSize="small"
            />
            {formatDistance(subHours(new Date(), 125), new Date(), {
              addSuffix: true
            })}
          </Typography>
        </Box>
        <Avatar
          variant="rounded"
          sx={{
            width: 50,
            height: 50
          }}
          alt={user.name}
          src={user.avatar}
        />
      </Box>
      <DividerWrapper>
        {format(subDays(new Date(), 5), 'MMMM dd yyyy')}
      </DividerWrapper>

      <Box
        display="flex"
        alignItems="flex-start"
        justifyContent="flex-end"
        py={3}
      >
        <Box
          display="flex"
          alignItems="flex-end"
          flexDirection="column"
          justifyContent="flex-end"
          mr={2}
        >
          <CardWrapperPrimary>Hey! Are you there?</CardWrapperPrimary>
          <CardWrapperPrimary
            sx={{
              mt: 2
            }}
          >
            Heeeelloooo????
          </CardWrapperPrimary>
          <Typography
            variant="subtitle1"
            sx={{
              pt: 1,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <ScheduleTwoToneIcon
              sx={{
                mr: 0.5
              }}
              fontSize="small"
            />
            {formatDistance(subHours(new Date(), 60), new Date(), {
              addSuffix: true
            })}
          </Typography>
        </Box>
        <Avatar
          variant="rounded"
          sx={{
            width: 50,
            height: 50
          }}
          alt={user.name}
          src={user.avatar}
        />
      </Box>
      <DividerWrapper>Today</DividerWrapper>
      <Box
        display="flex"
        alignItems="flex-start"
        justifyContent="flex-start"
        py={3}
      >
        <Avatar
          variant="rounded"
          sx={{
            width: 50,
            height: 50
          }}
          alt="Zain Baptista"
          src="/static/images/avatars/2.jpg"
        />
        <Box
          display="flex"
          alignItems="flex-start"
          flexDirection="column"
          justifyContent="flex-start"
          ml={2}
        >
          <CardWrapperSecondary>Hey there!</CardWrapperSecondary>
          <CardWrapperSecondary
            sx={{
              mt: 1
            }}
          >
            How are you? Is it ok if I call you?
          </CardWrapperSecondary>
          <Typography
            variant="subtitle1"
            sx={{
              pt: 1,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <ScheduleTwoToneIcon
              sx={{
                mr: 0.5
              }}
              fontSize="small"
            />
            {formatDistance(subMinutes(new Date(), 6), new Date(), {
              addSuffix: true
            })}
          </Typography>
        </Box>
      </Box>
      <Box
        display="flex"
        alignItems="flex-start"
        justifyContent="flex-end"
        py={3}
      >
        <Box
          display="flex"
          alignItems="flex-end"
          flexDirection="column"
          justifyContent="flex-end"
          mr={2}
        >
          <CardWrapperPrimary>
            Hello, I just got my Amazon order shipped and I’m very happy about
            that.
          </CardWrapperPrimary>
          <CardWrapperPrimary
            sx={{
              mt: 1
            }}
          >
            Can you confirm?
          </CardWrapperPrimary>
          <Typography
            variant="subtitle1"
            sx={{
              pt: 1,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <ScheduleTwoToneIcon
              sx={{
                mr: 0.5
              }}
              fontSize="small"
            />
            {formatDistance(subMinutes(new Date(), 8), new Date(), {
              addSuffix: true
            })}
          </Typography>
        </Box>
        <Avatar
          variant="rounded"
          sx={{
            width: 50,
            height: 50
          }}
          alt={user.name}
          src={user.avatar}
        />
      </Box>
    </Box>
  );
}

export default ChatContent;
