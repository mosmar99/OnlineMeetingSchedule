import "./app.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages
import Home from "./pages/Home";
import About from "./pages/About";
import NewMeet from "./pages/NewMeet";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Calendar from "./pages/Calendar";

export const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/newMeet' element={<NewMeet/>}/>
                <Route path='/calendar' element={<Calendar />}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/signup' element={<SignUp/>}/>
            </Routes>
        </BrowserRouter>
    )
}