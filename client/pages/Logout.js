import { useEffect } from "react";

const { Navigate } = require("react-router-dom");

function Logout({ removeUser }) {
    useEffect(() => {
        removeUser();
    }, [])
    
    return <Navigate to="/" />;
}

export default Logout;