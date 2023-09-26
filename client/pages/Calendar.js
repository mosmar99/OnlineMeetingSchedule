import useFetch from "../utils/useFetch";

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, List, ListItem, ListItemText, Button } from '@mui/material';

const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const monthNames = ["January", "Feburary", "Mars", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

/**
 * Formats the start and end date for a meeting nicely.
 * @param {*} startDate - meeting start date
 * @param {*} endDate   - meeting end date (same calendar date as start)
 * @returns formatted meeting date and time
 */
const displayDates = (startDate, endDate) => {
    const calendarDate = `${1900+startDate.getYear()}/${startDate.getMonth()}/${startDate.getDate()}` 
    
    const displayTime = date => `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`

    const startTime = displayTime(startDate);
    const endTime = displayTime(endDate);

    return `${startTime} - ${endTime}, ${calendarDate}`;
}

/**
 * Fetch the dates inside a month and a few surrounding dates to
 * construct an even sunday to saturday month structure (i.e a
 * visual month).
 * @param {Date} selectedMonth  - Date with selected month (any day within the month)
 * @returns All dates (days) within the visual month.
 */
const getVisualMonth = selectedMonth => {
    let year = selectedMonth.getYear() + 1900;
    let month = selectedMonth.getMonth();

    let daysInMonth = new Date(year, month+1, 0).getDate();

    let startDate = new Date(year, month, 1);           // Start of month date
    let endDate = new Date(year, month, daysInMonth);   // End of month date
    
    startDate.setDate(startDate.getDate() - startDate.getDay());    // Adjust start date to sunday
    endDate.setDate(endDate.getDate() + (6-endDate.getDay()));      // Adjust end date to saturday

    let datesArray = []  // Every date (day) inside the visual month.

    for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1))
        datesArray.push(new Date(date));

    return datesArray;
}

/**
 * Calendar component made with React
 */
const Calendar = () => {
    const {data, isPending, error} = useFetch("http://localhost:3000/api/meetings/list");

    const [viewedMonth, setViewedMonth] = useState(new Date());

    if (isPending) return <p>loading...</p>
    if (error) return <p>{error}</p>

    const meetings = data.map(item => ({...item, startDate: new Date(item.startDate), endDate: new Date(item.endDate)}))
    const visualMonth = getVisualMonth(viewedMonth);

    const nextMonth = () => {
        let month = new Date();
        month.setMonth(viewedMonth.getMonth()+1);
        setViewedMonth(month);
    }

    const prevMonth = () => {
        let month = new Date();
        month.setMonth(viewedMonth.getMonth()-1);
        setViewedMonth(month);
    }

    return ( 
        <Grid container>
            <Grid item xs={3}>
                <h2 style={{ margin: "30px 0 5px 15px", fontSize: "24px"}}>Upcoming meetings</h2>
                <List>
                    {meetings.map(meeting => (
                        <ListItem key={meeting.title}>
                            <ListItemText 
                                primary={meeting.title} 
                                secondary={displayDates(meeting.startDate, meeting.endDate)} 
                            />
                        </ListItem>
                    ))}
                </List>
                <Button component={Link} to="/newMeet" style={{ margin: "30px 0 5px 15px"}}>+ New meeting</Button> 
            </Grid>
            <Grid item xs={9} padding={2}>
                <div>
                    <h1>{monthNames[viewedMonth.getMonth()]}</h1>
                    <Grid container>
                        <Button variant="outlined" onClick={prevMonth}>Previous</Button>
                        <Button variant="outlined" onClick={nextMonth}>Next</Button>
                    </Grid>
                </div>
                <Grid container columns={7} style={{ marginTop: "20px"}}>
                    {dayNames.map(day => (
                        <Grid item xs={1} key={day}>
                            <p><b>{day}</b></p>
                        </Grid>
                    ))}
                    {visualMonth.map(date => {
                        let extraStyle = {};
                        
                        if (date.getMonth() !== viewedMonth.getMonth()) 
                            extraStyle = {opacity: "0.4", ...extraStyle}

                        let meetingsToday = meetings.filter(meeting => meeting.startDate.toDateString() === date.toDateString());

                        return (
                            <Grid item xs={1} key={date}>
                                <div style={{height: "100px", border: "1px solid lightgray"}}>
                                    <div style={{padding: "10px"}}>
                                        <span style={extraStyle}>{date.getDate()}</span>
                                        {meetingsToday.map(meeting => <p key={meeting.title}>{meeting.title}</p>)}
                                    </div>
                                </div>
                            </Grid>
                        )
                    })}
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Calendar;