export function TrackerPage( ){
    return (
        <div>
            <h1>Tracker</h1>
            <label>Exercise Name</label>
            <input type="text" required placeholder="Exercise" />

    {[1, 2, 3, 4].map((set) => (
      <div key={set} className="set-row">
        <input type="number" placeholder="Weight" />
        <span>Set {set}</span>
        <input type="number" placeholder="Reps" />
      </div>
    ))}

    <button>Add</button>
        </div>
    )
}