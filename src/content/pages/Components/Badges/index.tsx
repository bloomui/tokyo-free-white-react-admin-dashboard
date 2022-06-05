import { Helmet } from 'react-helmet-async';
import PageTitle from 'src/components/PageTitle';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider
} from '@mui/material';
import { useState } from 'react';
import Footer from 'src/components/Footer';

import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import MailIcon from '@mui/icons-material/Mail';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';

const shapeStyles = { bgcolor: 'primary.main', width: 40, height: 40 };
const shapeCircleStyles = { borderRadius: '50%' };
const rectangle = <Box component="span" sx={shapeStyles} />;
const circle = (
  <Box component="span" sx={{ ...shapeStyles, ...shapeCircleStyles }} />
);

function Badges() {
  const [count, setCount] = useState(1);
  const [invisible, setInvisible] = useState(false);

  const handleBadgeVisibility = () => {
    setInvisible(!invisible);
  };

  return (
    <>
      <Helmet>
        <title>Badges - Components</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading="Badges"
          subHeading="Badge generates a small badge to the top-right of its child(ren)."
          docs="https://material-ui.com/components/badges/"
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Shapes" />
              <Divider />
              <CardContent>
                <Stack spacing={3} direction="row">
                  <Badge color="secondary" badgeContent=" ">
                    {rectangle}
                  </Badge>
                  <Badge color="secondary" badgeContent=" " variant="dot">
                    {rectangle}
                  </Badge>
                  <Badge color="secondary" overlap="circular" badgeContent=" ">
                    {circle}
                  </Badge>
                  <Badge
                    color="secondary"
                    overlap="circular"
                    badgeContent=" "
                    variant="dot"
                  >
                    {circle}
                  </Badge>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Badges Visibility" />
              <Divider />
              <CardContent>
                <Box
                  sx={{
                    color: 'action.active',
                    display: 'flex',
                    flexDirection: 'column',
                    '& > *': {
                      marginBottom: 2
                    },
                    '& .MuiBadge-root': {
                      marginRight: 4
                    }
                  }}
                >
                  <div>
                    <Badge color="secondary" badgeContent={count}>
                      <MailIcon />
                    </Badge>
                    <ButtonGroup>
                      <Button
                        aria-label="reduce"
                        onClick={() => {
                          setCount(Math.max(count - 1, 0));
                        }}
                      >
                        <RemoveIcon fontSize="small" />
                      </Button>
                      <Button
                        aria-label="increase"
                        onClick={() => {
                          setCount(count + 1);
                        }}
                      >
                        <AddIcon fontSize="small" />
                      </Button>
                    </ButtonGroup>
                  </div>
                  <div>
                    <Badge
                      color="secondary"
                      variant="dot"
                      invisible={invisible}
                    >
                      <MailIcon />
                    </Badge>
                    <FormControlLabel
                      sx={{ color: 'text.primary' }}
                      control={
                        <Switch
                          checked={!invisible}
                          onChange={handleBadgeVisibility}
                        />
                      }
                      label="Show Badge"
                    />
                  </div>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Colors" />
              <Divider />
              <CardContent>
                <Stack spacing={2} direction="row">
                  <Badge badgeContent={4} color="secondary">
                    <MailIcon color="action" />
                  </Badge>
                  <Badge badgeContent={4} color="success">
                    <MailIcon color="action" />
                  </Badge>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Badges;
