import "./Events.css";
import { useState } from "react";
import MeetingsHeader from "../../components/MeetingsHeader";

const FilterButton = () => {

}

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

    const meetings = [
        {
            host: "Emil Wagman",
            title: "Teammöte",
            description: "Fyll med information",
            date: "27 June",
            time: "15:00-17:00",
        }
    ]

    const views = [
        {
            name: "upcoming",
            title: "Upcoming",
            events: meetings,
        },
        {
            name: "pending",
            title: "Pending",
            events: [],
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
            <div style={{ display: "flex", justifyContent: "center" }}>
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
                                <span>{event.title}</span>
                                <span>{event.date}</span>
                                <span>{event.time}</span>
                                <span>{event.host}</span>
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
        </div>
    )
}

export default Events;