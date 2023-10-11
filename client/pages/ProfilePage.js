import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Box, Stack, Typography, Popover, Avatar } from '@mui/material';
import axios from "axios";
//import "./ProfilePage.css";

const Profile = ({ user }) => {

    const [editProfile, setEditProfile] = useState(false);
    const [newInfo, setNewInfo] = useState({username: user.username, firstName: user.firstName, lastName: user.lastName});
    
    const handleChange = (e) => {
        setNewInfo({
            ...newInfo,
            [e.target.name]: e.target.value
        });
    }

    const editInfo = () => {

        return (
            <>
                <TextField label={"username"} name="username" onChange={handleChange} value={newInfo.username}/>
                <TextField label={"First name"} name="firstName" onChange={handleChange} value={newInfo.firstName}/>
                <TextField label={"Last Name"} name="lastName" onChange={handleChange} value={newInfo.lastName}/>
            </>
        );
    }

    const displayInfo = () => {
        return (
            
            <TextField variant="standard" disabled label={"username"} value={user.username}/>
            
        );
    }

    return ( 
        <>
            <Stack alignItems={"center"} margin={"50px"} spacing={3}>
                <Avatar alt={user.firstname} sx={{height: 136, width:136, marginBottom:"50px"}}></Avatar>
                {editProfile ? editInfo() : displayInfo()}
                <Button variant="contained" onClick={() => {setEditProfile(!editProfile)}}>{editProfile ? "Save changes" : "Edit Profile"}</Button>
            </Stack>
            
        </>
    );
}

export default Profile;