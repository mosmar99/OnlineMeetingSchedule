import "./app.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// pages
import Home from "./pages/Home";
import About from "./pages/About";

export const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
            </Routes>
        </BrowserRouter>
    )
}