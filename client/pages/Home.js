import { Link } from "react-router-dom";
import calendarPreview from "../../public/calendar-preview.png";
import eventsPreview from "../../public/events-preview.png";
import "./Home.css";
import Footer from "../components/Footer";

export default function Home() {
    return (
        <div id="home">
            <h1 id="home-title">Get ahead of meetings<br />and stay organized.</h1>
            <p id="home-paragraph">Schedule your meetings online for all of your organisation’s needs.</p>
            <Link to="/meetings/events" className="home-get-started" style={{ marginTop: "46px" }}>Get started</Link>
            <div id="home-why">
                <div id="home-why-container">
                    <div id="home-why-left">
                        <h2>Why use Meetings?</h2>
                        <ul>
                            <li>Seamless transition of workflow and user <br/>experience.</li>
                            <li>Built from the ground up for business, <br/>professionals and students.</li>
                            <li>Offered completely free right in your web <br/>browser.</li>
                        </ul>
                    </div>
                    <div id="home-why-right">
                        <img id="home-calendar-preview" src={calendarPreview} />
                        <img id="home-events-preview" src={eventsPreview} />
                    </div>
                </div>
            </div>
            <div id="home-help">
                <div id="home-help-left">
                    <h2>Need help getting started?</h2>
                    <p>Learn how to seamlessly get started with Meetings.</p>
                </div>
                <div id="home-help-right">
                    <Link to="/features" id="home-help-how">How it works</Link>
                    <Link to="/support" id="home-help-support">Support</Link>
                </div>
            </div>
            <Footer />
        </div>
    )
}