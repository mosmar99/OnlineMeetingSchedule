import "./EditMeeting.css";
import {Button, TextField, Autocomplete, Checkbox} from "@mui/material";
import useFetch from "../utils/useFetch";
import axios from "axios";
import {useState} from "react";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function EditMeetingModal({title, description, date, time, organizer, participants,createdAt ,onExit}) {
    // const allParticipants = [organizer, ...participants];
    
    const {data: pending, isPending: loadingPending} = useFetch("/api/users/list");
    const {data: hosted, isPending: loadingHosted} = useFetch("/api/meetings");

    const [etitle, setTitle] = useState("");
    const [edesc, setDesc]   = useState("")
    const [participantList, setParticipantList] = useState([]);

    if (!loadingPending && !loadingHosted){

        const userData = [pending];
        let users = userData[0];
    
        const meetingsData = [hosted];
        const meetings = meetingsData[0];

        const organizerInfo = users.find(o => o._id === organizer);
        const organizerUsername = organizerInfo.username;

        //THE MEETING

        let allMeetingsByUser = [];

        for(let i = 0; i < meetings.length; i++){
            if(meetings[i].organizer === organizer){
                allMeetingsByUser.push(meetings[i]);
            }
        }

        let selectedMeeting;

        for(let i = 0; i < allMeetingsByUser.length; i++){
            if(allMeetingsByUser[i].createdAt === createdAt){
                selectedMeeting = allMeetingsByUser[i];
            }
        }

        for(let i = 0; i < participants.length; i++){
            let temp = users.find(o => o._id == participants[i]);
            if(temp != undefined){
                let idx = users.indexOf(temp);
                users.splice(idx, 1);
            }
            
        }

        const handleSubmit = () =>{


            let eParticipants = [...participants];
            let eOrganizer = organizer;
            let etimeSlots = [];
            let einvites = [];

            let newMeeting = {
                organizer: eOrganizer,
                participants: eParticipants,
                title: etitle,
                description: edesc,
                timeSlots: null,
                invites: null                
            }



            for(let i = 0; i < selectedMeeting.timeSlots.length; i++){
                etimeSlots.push(selectedMeeting.timeSlots[i]);
            }

            for(let i = 0; i < selectedMeeting.invites.length; i++){
                einvites.push(selectedMeeting.invites[i]);
            }
            
            for(let i = 0; i < selectedMeeting.timeSlots.length; i++){

            }
            for(let i = 0; i < etimeSlots.length; i++){
                for (let y = 0; y < eParticipants.length; y++){
                    const invite = {
                        participant: eParticipants[y],
                        timeSlot: etimeSlots[i],
                        vote: "maybe"
                    }
                    axios.post("/api/invites", invite).then(res => { einvites.push(res.data._id) })
                }
            }
    
            let p = new Promise(resolve => {
                setTimeout(() => {
                    axios.delete("/api/meetings/"+selectedMeeting._id);
                    newMeeting.invites = einvites;
                    newMeeting.timeSlots = etimeSlots;
                    console.log(newMeeting);
                    axios.post("/api/meetings/", newMeeting);
                    alert("updated meeting")
                },100);
                resolve(einvites);
            });
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
                        <TextField defaultValue={title} sx={{width: 6/10}} id="title" margin="dense" onChange={e => setTitle(e.target.value)}>Title</TextField>
                        <TextField defaultValue={description} sx={{width: 6/10}} id="desc" margin="dense" onChange={e => setDesc(e.target.value)}></TextField>
                        <TextField defaultValue={organizerUsername} disabled={true} sx={{width: 6/10}}  id="organizer" margin="dense"></TextField>
                        {users != null &&
                            <div id="autoc">
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
                            </div>
                        }
                        <Button variant="outlined" id="save-btn" sx={{color:"black"}} onClick={handleSubmit}>Save</Button>
                    </form>
                </div>
            </div>
        )
    }
}
// sx={{ margin: 2, marginBottom:6.5, bgcolor:'#4deb60', color:'#000000'}};
export default EditMeetingModal;