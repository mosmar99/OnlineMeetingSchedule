import "./EditMeeting.css";
import {Button, TextField, Autocomplete} from "@mui/material";
import useFetch from "../utils/useFetch";
import axios from "axios";

function EditMeetingModal({title, description, date, time, organizer, onExit}) {
    // const allParticipants = [organizer, ...participants];
    const {data} = useFetch("http://localhost:3000/api/users/list");
    const userData = [data];
    const users = userData[0];
    setTimeout(() => {
        const {data} = useFetch("http://localhost:3000/api/meetings");
        const meetingsData = [data];
        const meetings = meetingsData[0];
        console.log(meetings)
    }, 50)
    
    // if (!isPending){
        // const {data} = useFetch("http://localhost:3000/api/meetings");
        // const meetingsData = [data];
        // const meetings = meetingsData[0];
        // console.log(meetings)
    // }


    const handleSubmit = () =>{

    }

    return (
        <div id="meeting-info-modal">
            <div id="meeting-info-modal-top">
                <h3>edit-{title}</h3>
                <div onClick={onExit} id="meeting-info-modal-close">
                    <svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1.77979L20.5398 21.971" stroke="#272727" stroke-width="2" stroke-linecap="round"/>
                        <path d="M21.1704 2.33954L1.30223 22.2077" stroke="#272727" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </div>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <TextField defaultValue={title}></TextField>
                    <TextField defaultValue={description}></TextField>
                    <TextField defaultValue={organizer} disabled={false}></TextField>
                    {/* <Autocomplete
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
                    /> */}
                    <Button variant="outlined" sx={{margin:5, marginBottom:6.5, bgcolor:'#4deb60', color:'#000000'}}>Save</Button>
                </form>
            </div>
            {/* <div id="meeting-info-modal-info">
                <div id="meeting-info-modal-left">
                    <h4>Description</h4>
                    <p>{description}</p>
                </div>
            </div> */}
        </div>
    )
}

export default EditMeetingModal;