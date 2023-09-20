import "./app.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// pages
import Home from "./pages/Home";
import About from "./pages/About";
import NewMeet from "./pages/NewMeet";
import Calendar from "./pages/Calendar";

export const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/newMeet' element={<NewMeet/>}/>
                <Route path="/calendar" element={<Calendar />} />
            </Routes>
        </BrowserRouter>
    )
}