import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="home">
            <h2>Online Meeting Schedule</h2>
            <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec urna tincidunt, 
                interdum turpis vitae, convallis erat. Vestibulum consectetur, lorem ut 
                tincidunt volutpat, dui tortor pharetra felis, ut ornare felis dui commodo ligula.
                Suspendisse ac velit sed orci tincidunt ornare eu vel mauris.</p>
            <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec urna tincidunt, 
                interdum turpis vitae, convallis erat. Vestibulum consectetur, lorem ut 
                tincidunt volutpat, dui tortor pharetra felis, ut ornare felis dui commodo ligula.
                Suspendisse ac velit sed orci tincidunt ornare eu vel mauris.</p>
            <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec urna tincidunt, 
                interdum turpis vitae, convallis erat. Vestibulum consectetur, lorem ut 
                tincidunt volutpat, dui tortor pharetra felis, ut ornare felis dui commodo ligula.
                Suspendisse ac velit sed orci tincidunt ornare eu vel mauris.</p>
                <Link to="/about">test</Link>
                <Link to="/newMeet">newmeeting</Link>
        </div>
    )
}