import { TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import "./NewMeet.css";

const NewMeet = () => {
    return ( 
        <div className="newMeet">
            <div class="newMeet-form-container">
                <h1 id="newMeet-h1">Add a new meeting</h1>
                <TextField id="newMeet-title" variant="outlined" label="Title" required margin="dense" fullWidth="true"></TextField>
                <TextField id="newMeet-description" variant="outlined" label="Description" required margin="dense" fullWidth="true"></TextField>
                <TextField id="newMeet-place" variant="outlined" label="Place" required margin="dense" fullWidth="true"></TextField>
                <TextField id="newMeet-startend" variant="outlined" label="Start" required margin="dense" sx={{width:1/2}}></TextField>
                <TextField id="newMeet-startend" variant="outlined" label="End" required margin="dense" sx={{width:1/2}}></TextField>
                <Button variant='contained' fullWidth="true" id="newMeet-button">Add new meeting</Button>
            </div>
        </div>
    );
}
 
export default NewMeet;