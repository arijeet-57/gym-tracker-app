import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export function TrackerPage( ){

  const navigate = useNavigate();
  const [username, setUsername] = useState(""); //this username will be stored in the local storage of the web and will be sent in each request for validation
  const [message, setMessage] = useState("");
  const[exercise, setExercise] = useState("");
  const[sets, setSets] = useState([
    { weight: "", reps: "" },
    { weight: "", reps: "" },
    { weight: "", reps: "" },
    { weight: "", reps: "" },
  ]);

  //this loads the username from localstroage when component mounts
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if(storedUsername) { //Checks if there is any stored username in localstorage
      setUsername(storedUsername); //To check local storage open dev tools -> Application tab -> Local storage -> YOur domain
    }
  }, []);

  function handleSetChange(index, field, value) { //index is the set 1 to 4, field is the weight or reps, value is what the user typed in
    const updateSets = [...sets];
    updateSets [index][field] = value;
    setSets(updateSets);
  }

  async function handlesSubmit() {
    try{
      const res = await fetch("http://localhost:3000/tracker", {
        method: "POST",
        headers: {
          "Content-type" : "application/json"
        },
        body:JSON.stringify({
          username: username,
          exercise: exercise,
          sets: sets,
          date: new Date().toISOString().split("T")[0]
        })
      });


      const data = await res.json();
      setMessage(data.msg);

      if(data.msg === "Exercise saved successfully !") { //When data is stored successfully this if block will clear it for next input

        setExercise(""); 
        setSets([
          { weight: "", reps: "" },
          { weight: "", reps: "" },
          { weight: "", reps: "" },
          { weight: "", reps: "" },
        ]);
      }
    }catch(err) {
      setMessage("Error while saving exercise....")
    }
  }

  function navigateToLogs() {
    navigate("/Logs");
  }
  
    return (
        <div>
            <h1>Tracker</h1>

            {username && <p>Logged in as: {username}</p>} {/*This will show the current username stored in the local storage */}
            
            <label>Exercise Name</label>
            <input type="text" required placeholder="Exercise" value={exercise} onChange={(e) => setExercise(e.target.value)} />

{sets.map((set, index) => (
  <div key={index} className="set-row">
    <input
      type="number"
      placeholder="Weight"
      value={set.weight}
      onChange={(e) => handleSetChange(index, "weight", e.target.value)}
    />
    <span>Set {index + 1}</span>
    <input
      type="number"
      placeholder="Reps"
      value={set.reps}
      onChange={(e) => handleSetChange(index, "reps", e.target.value)}
    />
  </div>
))}


    <button onClick={handlesSubmit}>Add</button>

    {message && <p>{message}</p>}

    <button onClick={navigateToLogs}>Logs Page</button>
        </div>
    )
}