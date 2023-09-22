import { Link } from "react-router-dom";
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import "./SignUp.css";

const SignUp = () => {
    return ( 
        <div className="signUp">
            <div class='signUp-form-container'>
                <h1 id='signUp-form-header'>Sign up</h1>
                <TextField id="signUp-textfield" variant="outlined" label="Name" required margin="dense" fullWidth="true"></TextField>
                <TextField id="signUp-textfield" variant="outlined" label="Lastname" required margin="dense" fullWidth="true"></TextField>
                <TextField id="signUp-textfield" variant="outlined" label="Username" required margin="dense" fullWidth="true"></TextField>
                <TextField id="signUp-textfield" variant="outlined" label="Password" required margin="dense" fullWidth="true"></TextField>
                <TextField id="signUp-textfield" variant="outlined" label="Confirm Password" required margin="dense" fullWidth="true"></TextField>
                <TextField id="signUp-textfield" variant="outlined" label="E-mail" required margin="dense" fullWidth="true"></TextField>
                <Button variant='contained' id="signUp-page-button">Sign up</Button>
                <Link id="signUp-form-signup-link" to="/login">Already have an account? Sign in</Link>
            </div>
        </div>
    );
}
 
export default SignUp;