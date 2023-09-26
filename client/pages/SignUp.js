import { useState } from "react";
import { TextField, Button } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignUp.css";

const SignUp = ({ setUser }) => {
    const navigate = useNavigate();

    const [username, setUsername]   = useState("");
    const [email, setEmail]         = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState(""); 
    
    const [usernameError, setUsernameError] = useState(false)
    const [emailError, setEmailError]       = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const handleSubmit = e =>{
        e.preventDefault();
        
        let error = false;

        if (!username) {
            setUsernameError(true);
            error = true;
        }

        if (!email) {
            setEmailError(true);
            error = true;
        }

        if (!password1 || password1 !== password2) {
            setPasswordError(true);
            error = true;
        }

        if (error) return;

        let data = { username, email, password: password1 };

        axios.post("/api/users/signup", data)
            .then(res => {
                setUser(res.data);
                navigate("/calendar");
            })
            .catch(res => {
                alert("Failed to signup.")
            })
    }

    return ( 
        <div className="signUp">
            <div className='signUp-form-container'>
                <h1 id='signUp-form-header'>Sign up</h1>
                <form onSubmit={handleSubmit}>
                    <TextField 
                        className="signUp-textfield" 
                        variant="outlined" 
                        required 
                        label="Username"
                        margin="dense" 
                        fullWidth="true" 
                        onChange={e => setUsername(e.target.value)}
                        value={username}
                        error={usernameError}
                    />
                    <TextField 
                        className="signUp-textfield" 
                        variant="outlined" 
                        required 
                        label="Email"
                        margin="dense" 
                        fullWidth="true" 
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        error={emailError}
                    />
                    <TextField 
                        className="signUp-textfield" 
                        variant="outlined" 
                        required 
                        label="Password"
                        margin="dense" 
                        fullWidth="true" 
                        type="password"
                        onChange={e => setPassword1(e.target.value)}
                        value={password1}
                        error={passwordError}
                    />
                    <TextField 
                        className="signUp-textfield" 
                        variant="outlined" 
                        required 
                        label="Confirm password"
                        margin="dense" 
                        fullWidth="true"
                        type="password" 
                        onChange={e => setPassword2(e.target.value)}
                        value={password2}
                        error={passwordError}
                    />
                    <Button variant='contained' id="signUp-page-button" type="submit">Sign up</Button>
                </form>
                <Link id="signUp-form-signup-link" to="/login">Already have an account? Sign in</Link>
            </div>
        </div>
    );
}
 
export default SignUp;