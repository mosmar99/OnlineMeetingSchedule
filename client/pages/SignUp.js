import { useState } from "react";
import { TextField, Button, Box, Stack, Typography, Popover } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import { isValidEmail , isValidPassword} from "../utils/validateInput";
import axios from "axios";
import bgImage from "../../public/tilebg.svg";

const SignUp = ({ setUser }) => {
    const navigate = useNavigate();

    const [formInput, setformInput] = useState({username: "", email: "", password: "", firstName: "", lastName: ""});
    const [password2, setPassword2] = useState(""); 
    
    const [usernameError, setUsernameError] = useState(false);
    const [emailError, setEmailError]       = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null);

    const handleChange = (e) => {
        setformInput({
            ...formInput,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = e =>{
        e.preventDefault();

        let error = (!formInput.username || !isValidEmail(formInput.email) || (!isValidPassword(formInput.password) || formInput.password !== password2))

        setUsernameError(!formInput.username);
        setEmailError(!isValidEmail(formInput.email));
        setPasswordError(!isValidPassword(formInput.password) || formInput.password !== password2);

        if (error) return;

        axios.post( "/api/users/signup", formInput)
            .then(res => {
                setUser(res.data);
                navigate("/meetings/events");
            })
            .catch(res => {
                alert("Failed to signup.")
            })
    };

    /**
     * @param {event} event 
     */
    const handleMouseOver = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMouseLeave = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return ( 
        <Box align={"center"} 
                sx={{   backgroundColor:'#fffcc4',
                        backgroundImage: `url(${bgImage})`,
                        backgroundPosition: 'top',
                        height: '100vh'}}>

            <Stack spacing={2} width={"30%"} sx={{  backgroundColor: '#ffffff',
                                                    padding: '100px',
                                                    height: '100vh',
                                                    borderWidth: "0 5px",
                                                    borderStyle: "solid",
                                                    borderColor: "#ffc64d"}}>

                <Typography variant="h3" align="center">Sign up</Typography>
                <TextField 
                        name="username"
                        variant="outlined" 
                        required 
                        label="Username"
                        onChange={handleChange}
                        value={formInput.username}
                        error={usernameError}
                    />
                    <TextField
                        name="email"
                        variant="outlined" 
                        required 
                        label="Email"
                        onChange={handleChange}
                        value={formInput.email}
                        error={emailError}
                    />
                    <Popover
                        anchorEl={anchorEl}
                        open={open}
                        disableAutoFocus={true}
                        sx={{
                            borderRadius: "15px",
                            pointerEvents: 'none',
                            marginLeft: "20px"
                          }}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}> 
                        
                        <Stack padding={1.5} sx={{}}>
                            <Typography variant="h6" gutterBottom={true}>Password requirements</Typography>
                            <Typography variant="p" paragraph={true}>
                                • Needs to be 8 to 16 characters long<br/>
                                • contains at least one digit 1-9<br/>
                                • contains at least one lower case letter a-z<br/>
                                • contains at least one upper case letter A-Z<br/>
                                • can contain characters - # $ . % & *
                            </Typography>
                        </Stack>
                    </Popover>

                    <TextField 
                        name="password"
                        variant="outlined" 
                        required 
                        label="Password"
                        type="password"
                        onChange={handleChange}
                        onMouseEnter={handleMouseOver}
                        onMouseLeave={handleMouseLeave}
                        value={formInput.password}
                        error={passwordError}
                    />
                    <TextField 
                        variant="outlined" 
                        required 
                        label="Confirm password"
                        type="password" 
                        onChange={e => setPassword2(e.target.value)}
                        value={password2}
                        error={passwordError}
                    />
                    <TextField
                        name="firstName"
                        variant="outlined"  
                        label="First name"
                        onChange={handleChange}
                        value={formInput.firstName}
                    />
                    <TextField
                        name="lastName"
                        variant="outlined"  
                        label="Last name"
                        onChange={handleChange}
                        value={formInput.lastName}
                    />
                <Button variant='contained' onClick={handleSubmit}>Sign up</Button>
                <Link fontSize={"20px"} to="/login" align="center">Already have an account? Sign in</Link>
            </Stack>
        </Box>
    );
}

export default SignUp;