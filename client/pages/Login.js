import { Link } from "react-router-dom";
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import "./Login.css";

const Login = () => {
    return ( 
        <div className="login">
            <div class="login-form-container">
                <h1 id='login-form-header'>Sign in</h1>
                <TextField id="login-textfield" variant="outlined" label="Username" required margin="dense" fullWidth="true"></TextField>
                <TextField id="login-textfield" variant="outlined" label="Password" required margin="dense" fullWidth="true"></TextField>
                <Button variant='contained' id="login-page-button">Sign in</Button>
                <Link id="login-form-signup-link" to="/signup">No account? Sign up</Link>
            </div>
        </div>
    );
}
 
export default Login;