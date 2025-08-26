import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Calendar from "react-calendar"

export function LogsPage() {
    const [date, setDate] = useState(new Date());
    const navigate = useNavigate();

    function handleClick(selectedDate) {
        const year = selectedDate.getFullYear();
        const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
        const day = String(selectedDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}` // Format date as YYYY-MM-DD 
        navigate(`/logs/${formattedDate}`); //this will pass the date in the params
    }

    function back() {
        navigate("/Tracker");
    }

    return(
        <div>
            <h1>Logs</h1>
            <Calendar onClickDay={handleClick} value={date}/>
            <br /><br />
            <button onClick={back}>Back</button>
        </div>
    )
}