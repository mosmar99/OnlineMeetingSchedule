import { Dialog, DialogContent, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import "./NewMeet.css";
import {Component, useState} from "react";

function NewMeet(){
    const [open, setOpen] = useState(false);

    const toggle = () =>{
        setOpen(!open);
    }

    return(
        <div className="newMeet">
            <Button onClick={toggle} style={{ margin: "30px 0 5px 15px"}}>+ New meeting</Button>
            <Dialog open={open} className="newMeet-dialog" PaperProps={{style: {borderRadius: 2, border: "black"}}}>
                <DialogContent>
                    <div className="newMeet-form-container">
                        <h1 id="newMeet-h1">Add a new meeting</h1>
                        <Button onClick={toggle} id="newMeet-close-popup" variant="outlined">X</Button>
                        <TextField id="newMeet-title" variant="outlined" label="Title" required margin="dense" fullWidth={true}></TextField>
                        <TextField id="newMeet-description" variant="outlined" label="Description" required margin="dense" fullWidth={true}></TextField>
                        <TextField id="newMeet-place" variant="outlined" label="Place" required margin="dense" fullWidth={true}></TextField>
                        <TextField id="newMeet-startend" variant="outlined" label="Start" required margin="dense" sx={{width:1/2}}></TextField>
                        <TextField id="newMeet-startend" variant="outlined" label="End" required margin="dense" sx={{width:1/2}}></TextField>
                        <Button variant='contained' fullWidth={true} id="newMeet-button">Add new meeting</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>  
    );
}

 
export default NewMeet;