import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Card,
  Tooltip,
  Avatar,
  CardMedia,
  Button,
  IconButton,
  Grid,
  DialogTitle,
  Dialog,
  FormControlLabel,
  DialogContent,
  TextField,
  Checkbox
} from '@material-ui/core';
import { experimentalStyled } from '@material-ui/core/styles';

import ArrowBackTwoToneIcon from '@material-ui/icons/ArrowBackTwoTone';
import ArrowForwardTwoToneIcon from '@material-ui/icons/ArrowForwardTwoTone';
import UploadTwoToneIcon from '@material-ui/icons/UploadTwoTone';
import MoreHorizTwoToneIcon from '@material-ui/icons/MoreHorizTwoTone';
import { useViewerQuery } from '../MyChefsbase/api';
import React, { useState } from 'react';
import ProfileCover from 'src/content/applications/Users/profile/ProfileCover';
import { LoadingScreen } from 'src/components/layout';
import { useUpdateAccount } from 'src/utilities/api';
import { useNavigate } from 'react-router';

const Input = experimentalStyled('input')({
  display: 'none'
});

const AvatarWrapper = experimentalStyled(Card)(
  ({ theme }) => `

    position: relative;
    overflow: visible;
    display: inline-block;
    margin-top: -${theme.spacing(9)};
    margin-left: ${theme.spacing(2)};

    .MuiAvatar-root {
      width: ${theme.spacing(16)};
      height: ${theme.spacing(16)};
    }
`
);

const ButtonUploadWrapper = experimentalStyled(Box)(
  ({ theme }) => `
    position: absolute;
    width: ${theme.spacing(4)};
    height: ${theme.spacing(4)};
    bottom: -${theme.spacing(1)};
    right: -${theme.spacing(1)};

    .MuiIconButton-root {
      border-radius: 100%;
      background: ${theme.colors.primary.main};
      color: ${theme.palette.primary.contrastText};
      box-shadow: ${theme.colors.shadows.primary};
      width: ${theme.spacing(4)};
      height: ${theme.spacing(4)};
      padding: 0;
  
      &:hover {
        background: ${theme.colors.primary.dark};
      }
    }
`
);

const CardCover = experimentalStyled(Card)(
  ({ theme }) => `
    position: relative;

    .MuiCardMedia-root {
      height: ${theme.spacing(26)};
    }
`
);

const CardCoverAction = experimentalStyled(Box)(
  ({ theme }) => `
    position: absolute;
    right: ${theme.spacing(2)};
    bottom: ${theme.spacing(2)};
`
);


const ProfilePage = () => {

    const [updateOpen, setUpdateOpen] = useState<boolean>(false)
    const {data, loading, error} = useViewerQuery()

    if (loading) return <LoadingScreen />
    let user = data.viewer
    console.log(user)

  return (
    <>
      <Box display="flex" mb={3}>
        <Tooltip arrow placement="top" title="Go back">
          <IconButton color="primary" sx={{ p: 2, mr: 2 }}>
            <ArrowBackTwoToneIcon />
          </IconButton>
        </Tooltip>
        <Box>
            <Grid container  xs={12}>
                <Grid xs={9}>
          <Typography variant="h3" component="h3" gutterBottom>
            Profiel van {user.restaurantName}
          </Typography>
          </Grid>
          <Grid xs={3}>
          <Button onClick={() => setUpdateOpen(true)} variant="contained">
              Update Profiel
          </Button>
          </Grid>
          </Grid>
        </Box>
      </Box>
      <CardCover>
        {/* <CardMedia image={user.coverImg} /> */}
        <CardCoverAction>
          <Input accept="image/*" id="change-cover" multiple type="file" />
          <label htmlFor="change-cover">
            <Button
              startIcon={<UploadTwoToneIcon />}
              variant="contained"
              component="span"
            >
              Wijzig achtergrond
            </Button>
          </label>
        </CardCoverAction>
      </CardCover>
      <AvatarWrapper>
        {/* <Avatar variant="rounded" alt={user.fullName} src={} /> */}
        <ButtonUploadWrapper>
          <Input
            accept="image/*"
            id="icon-button-file"
            name="icon-button-file"
            type="file"
          />
          <label htmlFor="icon-button-file">
            <IconButton component="span" color="primary">
              <UploadTwoToneIcon />
            </IconButton>
          </label>
        </ButtonUploadWrapper>
      </AvatarWrapper>
      <Box py={2} pl={2} mb={3}>
        <Typography gutterBottom variant="h4">
          {user.restaurantName}
        </Typography>
        <Typography variant="subtitle2">{user.description}</Typography>
        <Typography sx={{ py: 2 }} variant="subtitle2" color="text.primary">
          {user.fullName} | {user.location} 
        </Typography>
        <Box
          display={{ xs: 'block', md: 'flex' }}
          alignItems="center"
          justifyContent="space-between"
        >
        </Box>
        <UpdateProfile
        open={updateOpen}
        onClose={() => setUpdateOpen(false)}
        />
      </Box>
    </>
  );
};

ProfilePage.propTypes = {
  // @ts-ignore
  user: PropTypes.object.isRequired
};

export default ProfilePage;



export  const  UpdateProfile = ({
    open,
    onClose,
  }: {
    open: boolean;
    onClose: () => void;
  }) => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [restaurantName, setRestaurantName] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
  
    const navigate = useNavigate()
  
    // const formState: updateAccountVariables = {
    //   email: '',
    //   password: '',
    //   description: '',
    //   location: '',
    //   fullName: '',
    //   restaurantName: '',
    // }
  
    const { updateAccount, loading, error } = useUpdateAccount({
      onCompleted: () => window.location.reload(),
    });
  
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                Update  profiel
            </DialogTitle>
            <DialogContent>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                    name="email"
                    id="email"
                    label="Email"
                    fullWidth
                    onChange={(e) => setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <TextField
                    name="password"
                    id="password"
                    label="Wachtwoord"
                    type="password"
                    fullWidth
                    onChange={(e) => setPassword(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <TextField
                    name="location"
                    id="location"
                    label="Locatie"
                    fullWidth
                    onChange={(e) => setLocation(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <TextField
                    multiline
                    name="fullName"
                    id="fullName"
                    label="Naam eigenaar"
                    fullWidth
                    onChange={(e) => setFullName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <TextField
                    multiline
                    name="restaurantName"
                    id="restaurantName"
                    label="Naam restaurant"
                    fullWidth
                    onChange={(e) => setRestaurantName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6} sm={12}>
                    <TextField
                    multiline
                    name="description"
                    id="description"
                    label="Beschrijving"
                    fullWidth
                    onChange={(e) => setDescription(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Checkbox value="allowExtraEmails" color="primary" />}
                      label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                  </Grid>
                </Grid>
                <Button
                onClick={() => updateAccount({
                  variables: {
                    email: email,
                    password: password,
                    fullName: fullName,
                    restaurantName: restaurantName,
                    description: description,
                    location: location
                  }
                })}
                //    component={RouterLink}
                //    to="/management/profile/details"
                   size="large"
                   variant="contained"
                >
                  Update
                </Button>
            </DialogContent>
        </Dialog>
    )
  }