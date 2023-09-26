import "./app.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

// pages
import Home from "./pages/Home";
import Support from "./components/Support";
import About from "./pages/About";
import NewMeet from "./pages/NewMeet";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import SignUp from "./pages/SignUp";
import Calendar from "./pages/Calendar";

// components
import MuiNavbar from "./components/MuiNavbar";
import Features from "./components/Features";
import NotFound from "./components/NotFound";

export const App = () => {
    const [cookies, setCookies, removeCookies] = useCookies(["user"])

    const setUser = user => setCookies("user", user);
    const removeUser = () => removeCookies("user");

    return (
        <div className="app">
            <MuiNavbar user={cookies.user} />
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/features' element={<Features />} />
                    <Route path='/support' element={<Support />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/newMeet' element={<NewMeet/>}/>
                    <Route path='/calendar' element={cookies.user ? <Calendar/> : <Navigate to="/login"/>}/>
                    <Route path='/login' element={cookies.user ? <Navigate to="/calendar"/> : <Login setUser={setUser}/>}/>
                    <Route path='/signUp' element={cookies.user ? <Navigate to="/calendar"/> : <SignUp setUser={setUser}/>}/>
                    <Route path='/logout' element={cookies.user ? <Logout removeUser={removeUser}/> : <Login/>}/>                   
                    <Route path="*" element={<NotFound />}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}