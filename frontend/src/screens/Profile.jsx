import React, { useContext } from 'react';
import { AuthContext } from '../contexts';
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Typography,
  Container,
  Link,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';


const UserDetails = ({user, logout}) => {

    const navigate = useNavigate();
    return (
    <>
        <CardContent>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" align="center">
              User Details
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" align="center">
              Username: {user && user.username}
            </Typography>
          </Grid>
          {/* Add more user details as needed */}
        </Grid>
      </CardContent>
      <CardActions>
        <Grid container justifyContent="center">
          <Grid item xs={6}>
            <Button fullWidth variant="contained" onClick={()=>logout()}
                sx={{backgroundColor: "red"}}
                >
              Logout
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth variant="contained" onClick={()=>navigate("/profile/settings")}>
              Settings
            </Button>
          </Grid>
        </Grid>
      </CardActions>
      </>
    );
}

const Profile = () => {

    const { user, logout } = useContext(AuthContext);
  return (
    <Container >

    <Card>
      { user 
      ? <UserDetails user={user} logout={logout}/>
      : <CardContent>
        <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
          <Link href="/login">Sign In to see your page.</Link>
        </Box>
         
        </CardContent>
      }
    </Card>
    </Container>
  );
};

export default Profile;