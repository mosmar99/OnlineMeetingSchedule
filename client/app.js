import "./app.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages
import Home from "./pages/Home";
import Support from "./components/Support";
import About from "./pages/About";
import NewMeet from "./pages/NewMeet";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Calendar from "./pages/Calendar";

// components
import MuiNavbar from "./components/MuiNavbar";
import Features from "./components/Features";
import NotFound from "./components/NotFound";

export const App = () => {
    return (
        <div className="app">
            <MuiNavbar />
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/features' element={<Features />} />
                    <Route path='/support' element={<Support />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/newMeet' element={<NewMeet/>}/>
                    <Route path='/calendar' element={<Calendar/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/signUp' element={<SignUp/>}/>
                    <Route path="*" element={<NotFound />}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}