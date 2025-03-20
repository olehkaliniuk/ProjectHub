import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Tasks() {

    const globalID = localStorage.getItem("globalID");
  // Zustand für Aufgabenliste
  const [tasks, setTasks] = useState([]);

  // Aufgaben abrufen, wenn die Komponente geladen wird
  useEffect(() => {
    axios.get("http://localhost:3000/")
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => console.error("Fehler beim Abrufen der Aufgaben:", error));
  }, []); 

  return (
    <div>
      <h2>Aufgabenliste</h2>
      {globalID ? (
        <div className="formreg">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <ul key={task.id}>
                <li><strong>Name:</strong> {task.name}</li>
                <li><strong>Beschreibung:</strong> {task.description}</li>
                <li><strong>Erstellt von:</strong> {task.created_by}</li>
              </ul>
            ))
          ) : (
            <p>Keine Aufgaben gefunden.</p>
          )}
        </div>
      ) : (
        <p>Bitte registrieren Sie sich zuerst.</p>
      )}
    </div>
  );
}

export default Tasks;
