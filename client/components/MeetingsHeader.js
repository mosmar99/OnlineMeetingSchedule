import { Link } from "react-router-dom";
import "./MeetingsHeader.css";

const pages = {
    events: "Events",
    calendar: "Calendar"
}

function MeetingsHeader({ activePage }) {
    return (
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
                
                <div id="meetings-new-meeting">
                    <Link to="/newMeet">+ New Meeting</Link>
                </div>
            </div>
        </div>
    );
}

export default MeetingsHeader;