import { useEffect, useState } from "react"
import {useNavigate} from "react-router-dom"

export function LoginPage() { 
const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    async function handleInput(e) {
        e.preventDefault();   //prevents reload

            try{
                const res = await fetch("http://localhost:3000/login", {
                    method: "POST",
                    headers: {
                        "Content-type" : "application/json"
                    },
                    body: JSON.stringify({username, password})
                })

            const data = await res.json();
            setMessage(data.msg);

            if(data.msg === "User logged in!") { 
                localStorage.setItem("username", username); //saves the username in the local storage for the upcoming pages
            }

            if (res.ok && data.msg === "User logged in!") {
            navigate("/Tracker"); 
            }
            }catch(err) {
                setMessage("Error in fetching the data")
            }

            
    }
   

    return <div>
        <h1>Login</h1>
        <br />
        <form onSubmit={handleInput}>
        <br />
        <input type="text" required placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <br />
        <input type="password" required placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button type="submit">Submit</button>
        </form>
        {message && <p>{message}</p>}
    </div>
}
