import { useState } from "react";
import { TextField, Button, Box, Stack, Typography } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import bgImage from "../../public/tilebg.svg";

const SignUp = ({ setUser }) => {
    const navigate = useNavigate();

    const [formInput, setformInput] = useState({username: "", email: "", password: ""});
    const [password2, setPassword2] = useState(""); 
    
    const [usernameError, setUsernameError] = useState(false)
    const [emailError, setEmailError]       = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const handleChange = (e) => {
        setformInput({
            ...formInput,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = e =>{
        e.preventDefault();

        let error = (!formInput.username || !formInput.email || (!formInput.password || formInput.password !== password2))

        setUsernameError(!formInput.username);
        setEmailError(!formInput.email);
        setPasswordError(!formInput.password || formInput.password !== password2);

        if (error) return;

        axios.post("/api/users/signup", formInput)
            .then(res => {
                setUser(res.data);
                navigate("/calendar");
            })
            .catch(res => {
                alert("Failed to signup.")
            })
    }

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
                    <TextField 
                        name="password"
                        variant="outlined" 
                        required 
                        label="Password"
                        type="password"
                        onChange={handleChange}
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
                <Button variant='contained' onClick={handleSubmit}>Sign up</Button>
                <Link fontSize={"20px"} to="/login" align="center">Already have an account? Sign in</Link>
            </Stack>
        </Box>
    );
}

export default SignUp;