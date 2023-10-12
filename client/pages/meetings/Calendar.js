import "./Calendar.css";
import useFetch from "../../utils/useFetch";
import { useState } from 'react';
import MeetingsHeader from "../../components/MeetingsHeader";
import transposeEvents from "../../utils/transposeEvents";

const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const monthNames = ["January", "Feburary", "Mars", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const isSameDate = (date1, date2) => {
    const format = date => `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`;

    return format(date1) === format(date2);
}

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

const Calendar = ({ user }) => {
    let {data, isPending} = useFetch("/api/meetings/upcoming", { userId: user._id });
    const [viewedMonth, setViewedMonth] = useState(new Date());

    if (isPending)
        return <MeetingsHeader activePage="calendar" />

    data = transposeEvents(data);

    console.log(data)

    const meetings = data.map(item => ({
        ...item, 
        startDate: new Date(Date.parse(item.startTime.slice(1, -1))), 
        endDate: new Date(Date.parse(item.endTime.slice(1, -1)))
    }))

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

    let weeks = [];
    for (let i = 0; i < visualMonth.length; i += 7)
        weeks.push(visualMonth.slice(i, i + 7));

    console.log(meetings)

    return ( 
        <div>
            <MeetingsHeader activePage="calendar" user={user}/>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "50px"}}>
                <div style={{width: "1000px"}}>

                    {/* Calendar controls*/}
                    <div id="calendar-controls">
                        <div onClick={prevMonth} id="calendar-previous-month">
                            <svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 1L1 7.5L7 14" stroke="black"/>
                            </svg>
                            <span>Previous month</span>
                        </div>
                        <h1>{monthNames[viewedMonth.getMonth()]}, {viewedMonth.getFullYear()}</h1>                            
                        <div onClick={nextMonth} id="calendar-next-month">
                            <span>Next month</span>
                            <svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L7 7.5L1 14" stroke="black"/>
                            </svg>
                        </div>
                    </div>

                    {/* Calendar content */}
                    <div id="calendar-content">
                        <div id="calendar-content-header">
                            {dayNames.map(day => (                                
                                <p key={day} className="calendar-content-weekday">{day}</p>
                            ))}
                        </div>
                        {weeks.map((week, i) => (
                            <div className="calendar-content-row" key={i}>
                                {week.map(date => {
                                    let extraStyle = {};
                                    
                                    if (date.getMonth() !== viewedMonth.getMonth()) 
                                        extraStyle = {opacity: "0.4", display: "inline", fontSize: "14px", ...extraStyle}

                                    let meetingsToday = meetings.filter(meeting => meeting.startDate.toDateString() === date.toDateString());

                                    let isToday = isSameDate(new Date(), date);

                                    return (
                                        <div key={date}>
                                            <div className={isToday ? "calendar-active-day-marker" : "calendar-day-marker"}>
                                                <span style={extraStyle}>{date.getDate()}</span>
                                            </div>
                                            {meetingsToday.map(meeting => <li key={meeting.titles} style={{ margin: "0 0 0 14px" }}>{meeting.titles}</li>)}
                                        </div>
                                    )
                                })}
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Calendar;