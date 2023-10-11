import "./Header.css";
import { AppBar, Toolbar, Typography, Grid } from '@mui/material';

const Header = ({ user }) => {
	return (
		<AppBar position="relative" id="header">
			<Toolbar sx={{ bgcolor: '#FFF8BD', height: "100%", padding: "0 !important" }}>
				<Grid container justifyContent="center">
					<Grid container alignItems="center" justifyContent="space-between" id="header-content">
						<div id="header-left">
							<Typography variant="h6" noWrap component="a" href="/" id="header-logo">
								Meetings
							</Typography>

							<div id="header-centered-links">
								<Typography variant="h6" noWrap component="a" href="/">
									Home
								</Typography>

								{user && (
									<Typography	variant="h6" noWrap component="a" href="/meetings/events">
										Events
									</Typography>
								)}

								{user && (
									<Typography	variant="h6" noWrap component="a" href="/meetings/calendar">
										Calendar
									</Typography>
								)}
							
								<Typography variant="h6" noWrap component="a" href="/features">
									Features
								</Typography>

								<Typography variant="h6" noWrap component="a" href="/support">
									Support
								</Typography>

								<Typography variant="h6" noWrap component="a" href="/about">
									About
								</Typography>
							</div>
						</div>
			
						<div id="header-right">
							{!user && (
								<Typography variant="h6" noWrap component="a" href="/signUp" id="header-signup">
								Sign up
								</Typography>
							)}

							{!user && (
								<Typography variant="h6" noWrap component="a" id="header-login-logout" href="/login">
								Login
								</Typography>
							)}

							{user && (
								<Typography variant="h6" noWrap component="a" id="header-login-logout" href="/profile">
								{user.username}
								</Typography>
							)}

							{user && (
								<Typography variant="h6" noWrap component="a" id="header-login-logout" href="/logout">
								Logout
								</Typography>
							)}
						</div>
					</Grid>
				</Grid>
			</Toolbar>
		</AppBar>
	);
}

export default Header;
