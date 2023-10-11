import { Link } from "react-router-dom";
import "./MeetingsHeader.css";
import { Fragment, useState } from "react";
import NewMeetingModal from "./NewMeeting";

const pages = {
    events: "Events",
    calendar: "Calendar"
}

function MeetingsHeader({ activePage }) {
    const [modal, setModal] = useState(false);

    return (
        <Fragment>
            <div id="meetings-header">
                <div id="meetings-header-content" >
                    <div style={{ marginBottom: "33px"}}>
                        {Object.keys(pages).map(page => (
                            <Link 
                                className={page === activePage ? "meetings-header-active-page" : "meetings-header-page"}
                                to={"/meetings/"+page}
                                key={page}
                            >    
                                {pages[page]}
                            </Link>
                        ))}
                    </div>
                    
                    <div id="meetings-new-meeting" onClick={() => setModal(true)}>
                        + New meeting
                    </div>
                </div>
            </div>
            {modal && <NewMeetingModal onClose={() => setModal(false)}/>}
        </Fragment>
    );
}

export default MeetingsHeader;