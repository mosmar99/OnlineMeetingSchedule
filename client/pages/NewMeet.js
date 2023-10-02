import axios from 'axios';
import { useState } from 'react';
import dayjs from 'dayjs';
import { TextField, Button, DialogContent, Dialog, DialogTitle} from '@mui/material';
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
    // const [startDate, setStartDate] = useState(dayjs());
    // const [endDate, setEndDate]     = useState(dayjs());

    const [open, setOpen] = useState(false);

    const [timeList, setTimeList] = useState([{time: [dayjs(),dayjs()]}]);

    const toggle = () =>{
        setOpen(!open);
    }

    const handleTimeAdd = () => {
        setTimeList([...timeList, [dayjs(),dayjs()]]);
    }

    const handleTimeRemove = (index) =>{
        const list = [...timeList];
        console.log(list);
        list.splice(index, 1);
        setTimeList(list);
    }

    const handleSubmit = e => {
        e.preventDefault();

        let data = {title, desc, place};

        for (let idx = 0; idx < timeList.length; idx++){
            let times = {startDate: timeList[idx][0].toDate(), endDate: timeList[idx][1].toDate()};
            let meeting_info = {...data, ...times};

            console.log(meeting_info);

            axios.post("/api/meetings/", meeting_info)
                .then(res => {
                    navigate("/calendar");
                })
                .catch(res => {
                    alert("Failed to add meeting.")
                })
            }
    }

    return ( 
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="newMeet">
                <Button onClick={toggle} style={{ margin: "30px 0 5px 15px"}}>+ New meeting</Button>
                <Dialog open = {open}>
                    <DialogTitle>
                        <h1 id="newMeet-h1">Add a new meeting</h1>
                        <Button variant='contained' id="newMeet-close" onClick={toggle}>X</Button>
                    </DialogTitle>
                    <DialogContent>
                        <div className="newMeet-form-container">
                            <form onSubmit={handleSubmit}>

                                {/*VALUES THAT WILL HOLD TRUE FOR ALL TIMESLOTS*/}
                                <TextField id="newMeet-title" variant="outlined" label="Title" required margin="dense" fullWidth={true}  value={title} onChange={e => setTitle(e.target.value)}></TextField>
                                <TextField id="newMeet-description" variant="outlined" label="Description" required margin="dense" fullWidth={true}   value={desc} onChange={e => setDesc(e.target.value)}></TextField>
                                <TextField id="newMeet-place" variant="outlined" label="Place" required margin="dense" fullWidth={true}   value={place} onChange={e => setPlace(e.target.value)}></TextField>

                                {/*TIME SLOTS*/}
                                {timeList.map((singleTime, index) => (
                                    <div key={index} className="timeList">
                                        <DateTimePicker disablePast={true} defaultValue={null} sx={{width:1/2, ...(timeList.length > 1 && {width: 4.3/10}), marginTop: 1}} ampm={false} label="Start" variant="outlined" fullWith={true}  required margin="dense"  value={singleTime.time} onChange={(value) => timeList[index][0] = value}/>
                                        <DateTimePicker disablePast={true} defaultValue={null} sx={{width:1/2, ...(timeList.length > 1 && {width: 4.3/10}), marginTop: 1}} ampm={false} label="End" variant="outlined" fullWith={true} required margin="dense"  value={singleTime.time} onChange={(value) => timeList[index][1] = value}/>
                                        {timeList.length > 1 && (<Button variant='contained' sx={{width: 1/10}}  id="newMeet-remove-time-button" onClick={() => handleTimeRemove(index)}>-</Button>)}
                                        {timeList.length - 1 === index && timeList.length < 4 &&
                                            (<Button variant='contained' fullWidth={true}  id="newMeet-add-time-button" onClick={handleTimeAdd}>+</Button>)
                                            }
                                    </div>
                                ))}
                                <Button variant='contained' fullWidth={true}  id="newMeet-button" type="submit">Add new meeting</Button>

                            </form>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </LocalizationProvider>
    );
}
 
export default NewMeet;