import "./Events.css";
import { useState, Fragment, useEffect} from "react";
import useFetch from "../../utils/useFetch";
import MeetingsHeader from "../../components/MeetingsHeader";
import MeetingInfoModal from "../../components/MeetingInfo";
import axios from "axios";
import {Menu, MenuItem} from "@mui/material";
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditMeetingModal from "../../components/EditMeeting";


const ChipButton = ({title, active, number, onClick}) => {
    return (
        <div className={active ? "events-active-chip-button" : "events-chip-button"} onClick={onClick}>
            <span>{title}</span>
            {(number !== 0) && (<span>{number}</span>)}
        </div>
    );
}

function Events() {
    const [view, setView] = useState("upcoming");
    const [infoModal, setInfoModal] = useState(null);
    const [editModal, setEditModal] = useState(null);
    const {data, isPending} = useFetch("/api/meetings/detailed");
    const [votes, setVotes] = useState([]);
    
    if (isPending) {
        return (
            <div>
                <MeetingsHeader activePage="events"/>
            </div>
        )
    }

    const meetings = data;

    let cookie = document.cookie;
    let organizer = cookie.slice(cookie.indexOf("_id"),cookie.indexOf("username"));
    organizer = organizer.slice(organizer.indexOf("%3A%22")+6, organizer.indexOf("%22%2C"));

    // useEffect(() => {
    //     // Fetch all votes for the participant
    //     const participantId = "65187dc4516fb886c50363b0";
    //     axios.get(`http://localhost:3000/api/invites/user/${participantId}`)
    //       .then((response) => {
    //         setVotes(response.data);
    //       })
    //       .catch((error) => {
    //         console.error("Error fetching votes:", error);
    //       });
    //   }, []);

    const views = [
        {
            name: "upcoming",
            title: "Upcoming",
            events: meetings.filter(meeting => meeting.startDate !== undefined),
        },
        {
            name: "pending",
            title: "Pending",
            events: meetings.filter(meeting => meeting.startDate === undefined),
        },
        {
            name: "past",
            title: "Past",
            events: [],
        }
    ]

    const events = views.find(v => v.name === view).events;

    return (
        <div>
            <MeetingsHeader activePage="events"/>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "50px" }}>
                <div style={{ width: "1000px" }}>
                    <div id="events-controls">
                        <div id="events-presets">
                            {views.map(v => (
                                <ChipButton 
                                    key={v.name} 
                                    title={v.title} 
                                    active={v.name === view} 
                                    number={v.events.length}
                                    onClick={() => setView(v.name)}/>
                            ))}
                        </div>
                        <div id="events-filter" onClick={() => alert("Not yet implemented.")}>
                            <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line x1="0.75" y1="1.25" x2="19.25" y2="1.25" stroke="#F8F8F8" stroke-width="1.5" stroke-linecap="round"/>
                                <line x1="3.75" y1="6.25" x2="16.25" y2="6.25" stroke="#F8F8F8" stroke-width="1.5" stroke-linecap="round"/>
                                <line x1="6.75" y1="11.25" x2="13.25" y2="11.25" stroke="#F8F8F8" stroke-width="1.5" stroke-linecap="round"/>
                            </svg>
                            <span>Filter</span>
                        </div>
                    </div>
                    <div id="events-list">
                        <div id="events-list-header">
                            <span>Title</span>
                            <span>Date</span>
                            <span>Time</span>
                            <span>Host</span>
                        </div>
                        {events.map(event => (
                            <div className="events-list-item"> 
                                <span onClick={() => setInfoModal(event)}>{event.title}</span>
                                <span>N/A</span>
                                <span>N/A</span>
                                <span>{event.organizer?.username || "N/A"}</span>
                                <PopupState variant="popover" popupId="demo-popup-menu">
                                    {(popupState) => (
                                        <Fragment>
                                            <MoreHorizIcon {...bindTrigger(popupState)}></MoreHorizIcon>
                                            <Menu {...bindMenu(popupState)}>
                                                <MenuItem onClick={() => {popupState.close();
                                                    setEditModal(event);
                                                }} name="info">Info</MenuItem>
                                                {organizer == event.host && view.name != "upcoming" &&
                                                    <MenuItem onClick={() => {popupState.close();
                                                        
                                                    }} name="edit">Edit</MenuItem>
                                                }
                                            </Menu>
                                        </Fragment>
                                    )}
                                </PopupState>                                
                            </div>
                        ))}
                        {!events.length && (
                            <div id="events-none-found">
                                No {view} events.
                            </div>
                        )}
                    </div>
                    <span id="events-end-notice">You’ve reached the end of the list.</span>
                </div>
            </div>
            {infoModal && (
                <MeetingInfoModal {...infoModal} onExit={() => setInfoModal(null)}/>
            )}
            {editModal &&(
                <EditMeetingModal {...editModal} onExit={() => setEditModal(null)}></EditMeetingModal>
            )}
        </div>
    )

    // Function to handle voting for a timeslot
    const handleVote = (vote) => {

    };
}

export default Events;