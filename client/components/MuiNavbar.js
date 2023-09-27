import React from 'react';
import { AppBar, Toolbar, Typography, Grid } from '@mui/material';

const MuiNavbar = ({ user }) => {
  return (
    <div className="muinavbar">
      <AppBar position="relative">
        <Toolbar sx={{ bgcolor: '#fff9c6' }}>
          <Grid container alignItems="center">

            {/* Centered links */}
            <Grid item xs={12} md={12} >
                <Grid container justifyContent="center" alignItems="center">
                {/* Add media query to hide centered links on smaller screens */}
                <style>
                {`
                  @media (max-width: 950px) {
                    .centered-links {
                      display: none;
                    }
                  }
                `}
                </style>

                <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                className="typography-left"
                sx={{
                  fontWeight: 900,
                  color: 'common.black',
                  textDecoration: 'none',
                  fonntFamily: 'Helvetica',
                  marginRight: '3%',
                }}
              >
                Meetings
              </Typography>

                <div className="centered-links">
                    <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                        display: 'inline-block', // Display as inline-block to reduce space
                        fontWeight: 500,
                        color: 'common.black',
                        textDecoration: 'none',
                        margin: '0 8px', // Adjust the margin as needed
                    }}
                    >
                        Home
                    </Typography>

                    {user && (
                      <Typography
                      variant="h6"
                      noWrap
                      component="a"
                      href="/calendar"
                      sx={{
                          display: 'inline-block', // Display as inline-block to reduce space
                          fontWeight: 500,
                          color: 'common.black',
                          textDecoration: 'none',
                          margin: '0 8px', // Adjust the margin as needed
                      }}
                      >
                          Calendar
                      </Typography>
                    )}
                    

                    <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/features"
                    sx={{
                        display: 'inline-block',
                        fontWeight: 500,
                        color: 'common.black',
                        textDecoration: 'none',
                        margin: '0 8px',
                    }}
                    >
                        Features
                    </Typography>

                    <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/support"
                    sx={{
                        display: 'inline-block',
                        fontWeight: 500,
                        color: 'common.black',
                        textDecoration: 'none',
                        margin: '0 8px',
                    }}
                    >
                        Support
                    </Typography>

                    <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/about"
                    sx={{
                        display: 'inline-block',
                        fontWeight: 500,
                        color: 'common.black',
                        textDecoration: 'none',
                        margin: '0 8px',
                    }}
                    >
                        About
                    </Typography>
                    </div>

                  {!user && (
                    <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="/signUp"
                  sx={{
                    fontWeight: 500,
                    color: 'common.white',
                    backgroundColor: 'common.black',
                    textDecoration: 'none',
                    marginLeft: '5px',
                    display: 'inline-block',
                    border: '1px solid black',
                    padding: '12px',
                    borderRadius: '25px',
                    fontSize: '14px',
                    fontFamily: 'Roboto',
                    width: '100px',
                    textAlign: 'center',
                    marginLeft: '6vw',
                  }}
                >
                  Sign up
                </Typography>
                )}

                {!user && (
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="/login"
                  sx={{
                    fontWeight: 500,
                    color: 'common.black',
                    textDecoration: 'none',
                    marginLeft: '20px',
                    display: 'inline-block',
                    border: '1.5px solid black',
                    padding: '12px',
                    borderRadius: '25px',
                    fontSize: '14px',
                    fontFamily: 'Roboto',
                    width: '100px',
                    textAlign: 'center',
                  }}
                >
                  Login
                </Typography>
                )}

                {user && (
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="/logout"
                  sx={{
                    fontWeight: 500,
                    color: 'common.black',
                    textDecoration: 'none',
                    marginLeft: '20px',
                    display: 'inline-block',
                    border: '1.5px solid black',
                    padding: '12px',
                    borderRadius: '25px',
                    fontSize: '14px',
                    fontFamily: 'Roboto',
                    width: '100px',
                    textAlign: 'center',
                  }}
                >
                  Logout
                </Typography>
                )}
                </Grid>
            </Grid>

          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default MuiNavbar;
