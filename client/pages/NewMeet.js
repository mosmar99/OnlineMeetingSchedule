import axios from 'axios';
import { useState } from 'react';
import dayjs from 'dayjs';
import { TextField, Button } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useNavigate } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import "./NewMeet.css";

const NewMeet = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [desc, setDesc]   = useState("");
    const [place, setPlace] = useState("");
    const [startDate, setStartDate] = useState(dayjs());
    const [endDate, setEndDate]     = useState(dayjs());

    const handleSubmit = e => {
        e.preventDefault();

        let data = { title, desc, place, startDate: startDate.toDate(), endDate: endDate.toDate() };

        console.log(data);

        axios.post("/api/meetings/", data)
            .then(res => {
                navigate("/calendar");
            })
            .catch(res => {
                alert("Failed to add meeting.")
            })
    }

    return ( 
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="newMeet">
                <div class="newMeet-form-container">
                    <h1 id="newMeet-h1">Add a new meeting</h1>
                    <form onSubmit={handleSubmit}>
                        <TextField id="newMeet-title" variant="outlined" label="Title" required margin="dense" fullWidth="true" value={title} onChange={e => setTitle(e.target.value)}></TextField>
                        <TextField id="newMeet-description" variant="outlined" label="Description" required margin="dense" fullWidth="true"  value={desc} onChange={e => setDesc(e.target.value)}></TextField>
                        <TextField id="newMeet-place" variant="outlined" label="Place" required margin="dense" fullWidth="true"  value={place} onChange={e => setPlace(e.target.value)}></TextField>
                        <DateTimePicker label="Start" variant="outlined" fullWith="true" required margin="dense"  value={startDate} onChange={value => setStartDate(value)}/>
                        <DateTimePicker label="End" variant="outlined" fullWith="true" required margin="dense"  value={endDate} onChange={value => setEndDate(value)}/>
                        <Button variant='contained' fullWidth="true" id="newMeet-button" type="submit">Add new meeting</Button>
                    </form>
                </div>
            </div>
        </LocalizationProvider>
    );
}
 
export default NewMeet;