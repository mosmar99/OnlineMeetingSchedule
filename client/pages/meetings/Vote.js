import { useNavigate, useParams } from "react-router-dom";
import "./Vote.css";
import useFetch from "../../utils/useFetch";
import axios from "axios";

function MeetingVote({ user }) {
    const { id } = useParams();
    const navigator = useNavigate();
    const {data, isPending, refresh} = useFetch("/api/meetings/detailed/"+id);

    if (isPending || !data) return <div></div>

    const vote = timeslot => {
        axios.patch("/api/meetings/vote/", { params: {
            meeting_id: id,
            userId: user._id,
            timeSlotId: timeslot._id
        }})

        refresh();
    }

    return (
        <div id="meeting-vote">
            <div id="meeting-vote-header">
                <div id="meeting-vote-back" onClick={() => navigator("/meetings/events/")}>
                    <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.5 1L1 5.5L5.5 10" stroke="#676767"/>
                    </svg>
                    <span>Back to events</span>
                </div>
                <h1>{data.title}</h1>
            </div>
            <div id="meeting-vote-info">
                <p>{data.description}</p>
                <div id="meeting-vote-participants">
                    <div>
                        <h3>Host</h3>
                        <p>{data.organizer.username}</p>
                    </div>
                    <div>
                        <h3>Invitees</h3>
                        <ul>
                            {data.participants.map(participant => (
                                <li>{participant.username}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div id="meeting-vote-timeslots">
                <div>
                    <h2>Dates and time</h2>
                    <div id="meeting-vote-timeslots-options">
                        {data.timeSlots.map(timeslot => {
                            const isVoted = timeslot.usersVoted.includes(user._id)
                            
                            return (
                                <div>
                                    <div className="meeting-vote-timeslot-info">
                                        <div>
                                            <h3>{timeslot.time}</h3>
                                            <p>{timeslot.date}</p>
                                        </div>
                                        <p>Votes: <b>{timeslot.votes}</b></p>
                                    </div>
                                    <div 
                                        className={isVoted ? "meeting-vote-voted-button" : "meeting-vote-vote-button"}
                                        onClick={() => vote(timeslot)}>
                                        {isVoted ? "Voted" : "Vote"}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <p id="meeting-vote-end-message">You’ve reached the end of the page.</p>
        </div>
    )
}

export default MeetingVote;