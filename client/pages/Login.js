import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Box, Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import axios from "axios";
import bgImage from "../../public/tilebg.svg";

const Login = ({ setUser }) => {
    const navigate = useNavigate();

    const [formInput, setformInput] = useState({email: "", password: ""});
    
    const handleChange = (e) => {
        setformInput({
            ...formInput,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = e =>{
        e.preventDefault();

        axios.post("/api/users/login", formInput)
            .then(res => {
                setUser(res.data);
                navigate("/meetings/calendar");
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

                <Typography variant="h3" align="center">Sign in</Typography>
                    <TextField
                        name="email"
                        variant="outlined" 
                        required 
                        label="Email"
                        onChange={handleChange}
                        value={formInput.email}
                    />
                    <TextField 
                        name="password"
                        variant="outlined" 
                        required 
                        label="Password"
                        type="password"
                        onChange={handleChange}
                        value={formInput.password}
                    />
                <Button variant='contained' onClick={handleSubmit}>Sign in</Button>
                <Link fontSize={"20px"} to="/login" align="center">No accout? Sign up</Link>
            </Stack>
        </Box>
    );
}
 
export default Login;