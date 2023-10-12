import "./app.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

// pages
import Home from "./pages/Home";
import Support from "./components/Support";
import About from "./pages/About";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import SignUp from "./pages/SignUp";
import Events from "./pages/meetings/Events";
import Calendar from "./pages/meetings/Calendar";
import ProfilePage from "./pages/ProfilePage";

// components
import Header from "./components/Header";
import Features from "./components/Features";
import NotFound from "./components/NotFound";
import MeetingVote from "./pages/meetings/Vote";

export const App = () => {
    const [cookies, setCookies, removeCookies] = useCookies(["user"])

    const setUser = user => setCookies("user", user);
    const removeUser = () => removeCookies("user");

    return (
        <div className="app">
            <div className="app-container">
                <Header user={cookies.user} />
                <BrowserRouter>
                    <Routes>
                        {/* Information */}
                        <Route path='/' element={<Home />} />
                        <Route path='/features' element={<Features />} />
                        <Route path='/profile' element={<ProfilePage user={cookies.user} />} />
                        <Route path='/support' element={<Support />} />
                        <Route path='/about' element={<About />} />
                        
                        {/* Meetings */}
                        <Route path='/meetings/events' element={cookies.user ? <Events user={cookies.user} /> : <Navigate to="/login"/>}/>
                        <Route path='/meetings/calendar' element={cookies.user ? <Calendar user={cookies.user}/> : <Navigate to="/login"/>}/>
                        <Route path='/meetings/vote/:id' element={cookies.user ? <MeetingVote user={cookies.user} /> : <Navigate to="/login"/>}/>
                        
                        {/* Authentication */}
                        <Route path='/login' element={cookies.user ? <Navigate to="/calendar"/> : <Login setUser={setUser}/>}/>
                        <Route path='/signUp' element={cookies.user ? <Navigate to="/calendar"/> : <SignUp setUser={setUser}/>}/>
                        <Route path='/logout' element={cookies.user ? <Logout removeUser={removeUser}/> : <Login/>}/>
                        
                        
                        {/* Others */}
                        <Route path="*" element={<NotFound />}/>
                    </Routes>
                </BrowserRouter>
            </div>
            
        </div>
    )
}