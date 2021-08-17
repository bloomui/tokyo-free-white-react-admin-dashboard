import { Helmet } from 'react-helmet-async';
import PageTitle from 'src/components/PageTitle';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Container, Grid, Card, CardHeader, CardContent, Divider } from '@material-ui/core';
import { useState } from 'react';
import Footer from 'src/components/Footer';

import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import MailIcon from '@material-ui/icons/Mail';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Box from '@material-ui/core/Box';
import Stack from '@material-ui/core/Stack';
import Badge from '@material-ui/core/Badge';

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
          docs="https://material-ui.com/components/badges/" />
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
                  <Badge color="secondary" overlap="circular" badgeContent=" " variant="dot">
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
                      marginBottom: 2,
                    },
                    '& .MuiBadge-root': {
                      marginRight: 4,
                    },
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
                    <Badge color="secondary" variant="dot" invisible={invisible}>
                      <MailIcon />
                    </Badge>
                    <FormControlLabel
                      sx={{ color: 'text.primary' }}
                      control={<Switch checked={!invisible} onChange={handleBadgeVisibility} />}
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
