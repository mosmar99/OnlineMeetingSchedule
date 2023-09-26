import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import axios from "axios";
import "./Login.css";

const Login = ({ setUser }) => {
    const navigate = useNavigate();

    const [email, setEmail]   = useState("");
    const [password, setPassword] = useState(""); 
    
    const handleSubmit = e =>{
        e.preventDefault();
    
        let data = { email, password};

        axios.post("/api/users/login", data)
            .then(res => {
                setUser(res.data);
                navigate("/calendar");
            })
            .catch(res => {
                alert("Failed to signup.")
            })
    }

    return ( 
        <div className="login">
            <div className="login-form-container">
                <h1 id='login-form-header'>Sign in</h1>
                <form onSubmit={handleSubmit}>
                    <TextField 
                        className="signUp-textfield" 
                        variant="outlined" 
                        required 
                        label="Email"
                        margin="dense" 
                        fullWidth="true" 
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                    />
                    <TextField 
                        className="signUp-textfield" 
                        variant="outlined" 
                        required 
                        label="Password"
                        margin="dense" 
                        fullWidth="true" 
                        type="password"
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                    />
                    <Button variant='contained' id="login-page-button" type="submit">Sign in</Button>
                </form>
                <Link id="login-form-signup-link" to="/signup">No account? Sign up</Link>
            </div>
        </div>
    );
}
 
export default Login;