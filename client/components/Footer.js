import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <div id="footer">
            <div id="footer-content">
                <h6>Meetings © Copyright 2023</h6>
                <div>
                    <Link to="/">Home</Link>
                    <Link to="/features">Features</Link>
                    <Link to="/support">Support</Link>
                    <Link to="/about">About</Link>
                </div>
            </div>
        </div>
    )
}

export default Footer;