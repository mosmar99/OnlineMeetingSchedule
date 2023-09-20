import useFetch from "../utils/useFetch";

const Calendar = () => {
    const {data, isPending, error} = useFetch("http://localhost:3000/api/meetings/list");

    if (isPending) {
        return <p>loading...</p>
    }

    return ( 
        <div className="calendar">
            <h2>List of meetings:</h2>
            {data.map(meeting => {
                return (
                    <div key={meeting.title}>
                        <h3>{meeting.title}</h3>
                        <p>{meeting.description}</p>
                    </div>
                )
            })}
        </div>
    );
}
 
export default Calendar;