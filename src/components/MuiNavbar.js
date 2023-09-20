import React from 'react';
import { AppBar, Toolbar, Typography, Grid } from '@mui/material';

const MuiNavbar = () => {
  return (
    <div className="muinavbar">
      <AppBar position="relative">
        <Toolbar sx={{ bgcolor: '#fff9c6' }}>
          <Grid container alignItems="center">
            {/* Left side of the AppBar */}
            <Grid item xs={1} md={1}>
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
                  marginLeft: '30%',
                }}
              >
                Meetings
              </Typography>
            </Grid>

            {/* Centered links */}
            <Grid item xs={3} md={8} >
                <Grid container justifyContent="center">
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
                </Grid>
            </Grid>


            {/* Right side of the AppBar */}
            <Grid item xs={8} md={3}>
              <Grid container justifyContent="flex-end">
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
                    marginLeft: 'auto',
                    display: 'inline-block',
                    border: '1px solid black',
                    padding: '12px',
                    borderRadius: '15px',
                    fontSize: '14px',
                    fontFamily: 'Roboto',
                  }}
                >
                  Sign up
                </Typography>

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
                    borderRadius: '15px',
                    fontSize: '14px',
                    fontFamily: 'Roboto',
                  }}
                >
                  Login
                </Typography>
              </Grid>
            </Grid>


          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default MuiNavbar;
