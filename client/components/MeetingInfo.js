import "./MeetingInfo.css";

function MeetingInfoModal({titles, descriptions, dates, times, usernames, participants, onExit}) {
    const allParticipants = [usernames+" (host)", ...participants];
    
    return (
        <div id="meeting-info-modal">
            <div id="meeting-info-modal-top">
                <h3>{titles}</h3>
                <div onClick={onExit} id="meeting-info-modal-close">
                    <svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1.77979L20.5398 21.971" stroke="#272727" stroke-width="2" stroke-linecap="round"/>
                        <path d="M21.1704 2.33954L1.30223 22.2077" stroke="#272727" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </div>
            </div>
            <div id="meeting-info-modal-info">
                <div id="meeting-info-modal-left">
                    <h4>Description</h4>
                    <p>{descriptions}</p>
                </div>
                <div id="meeting-info-modal-right">
                    <div id="meeting-info-modal-right-up">
                        <h4>Date and time</h4>
                        <p>{dates[0]}, {times[0]}</p>
                    </div>
                    <div id="meeting-info-modal-right-down">
                        <h4>Participants</h4>
                        {allParticipants.map(participant => {
                            return <p>- {participant || "N/A"}</p>;
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MeetingInfoModal;