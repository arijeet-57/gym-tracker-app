import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function LogsByDate() {
    const navigate = useNavigate();
    const {date} = useParams();
    const[logs, setLogs] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchLogs = async () => {
            const username = localStorage.getItem("username");
            const res = await fetch(`http://localhost:3000/logs/${username}?date=${date}`);
            const data = await res.json();
            setLogs(data.workout);
        };

        fetchLogs();
    }, [date]);


function backPage() {
    navigate("/Logs");
}

    return (
        <div>
            <h2>Logs for {date}</h2>
            {message && <p>{message}</p>}
            {logs.map((log, i) => (
                <div key={i}>
                <h3>{log.exercise}</h3>
                {log.sets
                .filter(set => set.weight || set.reps)
                .map((set, idx) => (
                    <p key={idx}>Set {idx + 1}: {set.weight} kg x {set.reps} reps</p>
                ))}
            </div>
            ))}
            <button onClick={backPage}>Back</button>
        </div>
    )
}