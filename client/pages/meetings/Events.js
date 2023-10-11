import "./Events.css";
import { useState } from "react";
import useFetch from "../../utils/useFetch";
import MeetingsHeader from "../../components/MeetingsHeader";
import MeetingInfoModal from "../../components/MeetingInfo";
import MeetingVoteModal from "../../components/MeetingVote";
import { Fragment } from "react";


const ChipButton = ({title, active, number, onClick}) => {
    return (
        <div className={active ? "events-active-chip-button" : "events-chip-button"} onClick={onClick}>
            <span>{title}</span>
            {(number !== 0) && (<span>{number}</span>)}
        </div>
    );
}

function Events({ user }) {
    const [view, setView] = useState("upcoming");
    const [infoModal, setInfoModal] = useState(null);
    const [voteModal, setVoteModal] = useState(null);
    const {data: pending, isPending: loadingPending} = useFetch("/api/meetings/pending", { userId: user._id });
    const {data: hosted, isPending: loadingHosted} = useFetch("/api/meetings/hosted", { userId: user._id });

    if (loadingPending || loadingHosted)
        return <div><MeetingsHeader activePage="events"/></div>

    // Transpose received data into a common object form.
    const transposeEvents = events => {
        const transposedEvents = []

        Object.keys(events).map(key => {
            for (let i = 0; i < events[key].length; i++) {
                if (transposedEvents[i] === undefined) transposedEvents[i] = {};
                transposedEvents[i][key] = events[key][i];
            }
        })

        return transposedEvents;
    }

    console.log(hosted)
    
    const views = [
        {
            name: "upcoming",
            title: "Upcoming",
            events: []
        },
        {
            name: "pending",
            title: "Pending",
            events: pending ? transposeEvents(pending) : [],
        },
        {
            name: "hosted",
            title: "Hosted",
            events: hosted ? transposeEvents(hosted) : [],
        }
    ]
    
    // Set up current view.
    const activeView = views.find(v => v.name === view);

    console.log(activeView.events)

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
                            {activeView.name === "pending" ? (
                                <span style={{gridColumnStart: 2, gridColumnEnd: 4}}>Available timeslots</span>
                            ) : (
                                <Fragment>
                                    <span>Date</span>
                                    <span>Time</span>
                                </Fragment>
                            )} 
                            <span>Host</span>
                        </div>
                        {activeView.events.filter(event => event.dates).map(event => (
                            <div className="events-list-item" key={event._id}> 
                                <span onClick={() => {
                                    if (activeView.name === "pending") setVoteModal(event)
                                    else setInfoModal(event)
                                }}
                                >{event.titles}</span>
                                {activeView.name === "pending" ? (
                                    <span style={{gridColumnStart: 2, gridColumnEnd: 4}}>
                                        <ul>
                                            {(() => {
                                                let timeSlots = [];
                                                for (let i = 0; i < event.dates.length; i++) {
                                                    timeSlots.push(`${event.times[i]}, ${event.dates[i]}`)
                                                }
                                                return timeSlots.map(timeSlot => {
                                                    return <li className="events-list-timeslot">{timeSlot}</li>
                                                })
                                            })()}
                                        </ul>
                                    </span>
                                ) : (
                                    <Fragment>
                                        <span>{event?.dates[0]}</span>
                                        <span>{event?.times[0]}</span>
                                    </Fragment>
                                )} 
                                <span>{event.usernames}</span>
                            </div>
                        ))}
                        {!activeView.events.length && (
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
            {voteModal && (
                <MeetingVoteModal {...voteModal} onExit={() => setVoteModal(null)}/>
            )}
        </div>
    )
}

export default Events;