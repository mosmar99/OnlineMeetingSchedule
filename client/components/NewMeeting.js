import axios from 'axios';
import { useState } from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TextField, Button, DialogContent, Dialog, DialogTitle, Autocomplete, Checkbox} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import "./NewMeeting.css";
import useFetch  from "../utils/useFetch";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function NewMeetingModal({ onClose }) {
    const [nmtitle, setTitle] = useState("");
    const [nmdesc, setDesc]   = useState("");

    const [timeList, setTimeList] = useState([{time: [dayjs(), dayjs()]}]);

    const [participantList, setParticipantList] = useState([]);

    const {data} = useFetch("http://localhost:3000/api/users/list");

    const userData = [data];
    const users = userData[0];

    const handleTimeAdd = () => setTimeList([...timeList, [dayjs(), dayjs()]]);

    const handleTimeRemove = (index) =>{
        const list = [...timeList];
        list.splice(index, 1);
        setTimeList(list);
    }

    const handleSubmit = e => {
        e.preventDefault();

        let cookie = document.cookie;
        let nmorganizer = cookie.slice(cookie.indexOf("_id"),cookie.indexOf("username"));
        nmorganizer = nmorganizer.slice(nmorganizer.indexOf("%3A%22")+6, nmorganizer.indexOf("%22%2C"));

        let nmparticipants = [];
        for (let i = 0; i < participantList.length; i++)
            nmparticipants[i] = participantList[i]._id;

        const times = { startTime: '', endTime: '' }

        let nmtimeSlots = []
        let nminvites = []
        
        for (let i = 0; i < timeList.length; i++){
            times.startTime = JSON.stringify(timeList[i][0]);
            times.endTime = JSON.stringify(timeList[i][1]);
            
            axios
                .post("/api/timeSlots", times)
                .then(res=>{
                    for (let y = 0; y < nmparticipants.length; y++){
                        const invite = {
                            participant: nmparticipants[y],
                            timeSlot: res.data._id,
                            vote: "maybe"
                        }
                        
                        console.log(invite)
                        axios.post("/api/invites", invite).then(res => { nminvites.push(res.data._id) })
                    }
                    nmtimeSlots.push(res.data._id);
                })
        }

        let p = new Promise(resolve => {
            setTimeout(() => {
                console.log(nmtimeSlots);
                console.log(nminvites);
                const meeting = {
                    organizer: nmorganizer,
                    participants: nmparticipants,
                    title: nmtitle,
                    description: nmdesc,
                    timeSlots: nmtimeSlots,
                    invites: nminvites
                }
        
                console.log(meeting);
        
                axios.post("/api/meetings/", meeting)
                .then( res =>{

                })
            },100);
            resolve(nmtimeSlots);
        });

        onClose();
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Dialog open = {open}>
                <DialogTitle>
                    <p id="newMeet-h1" style={{ marginBottom: "0" }}>Add a new meeting</p>
                    <Button variant='contained' id="newMeet-close" onClick={onClose}>X</Button>
                </DialogTitle>
                <DialogContent>
                    <div className="newMeet-form-container">
                        <form onSubmit={handleSubmit}>

                            {/*INFORMATION ABOUT MEETING*/}
                            <TextField id="newMeet-title" variant="outlined" label="Title" required margin="dense" fullWidth={true}  value={nmtitle} onChange={e => setTitle(e.target.value)}></TextField>
                            <TextField id="newMeet-description" variant="outlined" label="Description" minRows={6} required multiline margin="dense" fullWidth={true}   value={nmdesc} onChange={e => setDesc(e.target.value)}></TextField>

                            {/*ADD USERS TO MEETING*/}
                            {users != null &&
                                <Autocomplete
                                    onChange={(_, value) => setParticipantList(value)}
                                    sx={{marginTop: 1}}
                                    fullWidth={true}
                                    multiple
                                    options={users}
                                    disableCloseOnSelect
                                    getOptionLabel={(option) => option.username}
                                    renderOption={(props, option, { selected }) => (
                                        <li {...props}>
                                        <Checkbox
                                            icon={icon}
                                            checkedIcon={checkedIcon}
                                            style={{ marginRight: 8 }}
                                            checked={selected}
                                        />
                                        {option.username}
                                        </li>
                                    )}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Add users to meeting" placeholder="Users" />
                                    )}
                                />
                            }

                            {/*TIME SLOTS*/}
                            {timeList.map((singleTime, index) => (
                                <div key={index} className="timeList">
                                    <DateTimePicker //START DATE
                                        disablePast={true} 
                                        defaultValue={null} 
                                        sx={{width:1/2, ...(timeList.length > 1 && {width: 4.3/10}), marginTop: 1}} 
                                        ampm={false} 
                                        label="Start" 
                                        variant="outlined" 
                                        fullWith={true}  
                                        required 
                                        margin="dense"  
                                        value={singleTime.time} 
                                        onChange={(value) => timeList[index][0] = value}
                                    />
                                    <DateTimePicker //END DATE
                                        disablePast={true} 
                                        defaultValue={null} 
                                        sx={{width:1/2, ...(timeList.length > 1 && {width: 4.3/10}), marginTop: 1}} 
                                        ampm={false} 
                                        label="End"
                                        variant="outlined" 
                                        fullWith={true} 
                                        required 
                                        margin="dense"  
                                        value={singleTime.time} 
                                        onChange={(value) => timeList[index][1] = value}
                                    />
                                    {timeList.length > 1 && (
                                        <Button 
                                            variant='contained' 
                                            sx={{width: 1/10}}  
                                            id="newMeet-remove-time-button" 
                                            onClick={() => handleTimeRemove(index)}
                                        >-</Button>
                                    )}
                                    {timeList.length - 1 === index && timeList.length < 4 && (
                                        <Button 
                                            variant='contained' 
                                            fullWidth={true} 
                                            id="newMeet-add-time-button" 
                                            onClick={handleTimeAdd}
                                        >+</Button>
                                    )}
                                </div>
                            ))}
                            <Button variant='contained' fullWidth={true}  id="newMeet-button" type="submit">Add new meeting</Button>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>
        </LocalizationProvider>
    )
}

export default NewMeetingModal;