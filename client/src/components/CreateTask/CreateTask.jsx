import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CreateTask() {

    const globalAdmin = localStorage.getItem("globalAdmin");
    const globalID = localStorage.getItem("globalID");


      // Create Task
  const [nameTask, setNameTask] = useState('');
  const [descriptionTask, setDescriptionTask] = useState('');
  const [typeTask, setTypeTask] = useState('');
  const [difficultyTask, setDifficultyTask] = useState('');
  const [deadlineTask, setDeadlineTask] = useState('');

  // Users
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);


    // Load users
    useEffect(() => {
        axios.get("http://localhost:3000/users")
          .then(response => setUsers(response.data))
          .catch(error => console.error("Fehler beim Abrufen der Benutzer:", error));
      }, []);

      const handleUserSelect = (userId) => {
        setSelectedUsers(prevSelected =>
          prevSelected.includes(userId)
            ? prevSelected.filter(id => id !== userId)
            : [...prevSelected, userId]
        );
      };
    
      const handleCreateTask = (e) => {
        e.preventDefault();
    
        const taskData = {
          nameTask,
          descriptionTask,
          createdBy: globalID,
          typeTask,
          difficultyTask,
          deadlineTask,
          assignedUsers: selectedUsers,
        };
        axios.post("http://localhost:3000/createTask", taskData)
        .then(res => {
          console.log("Task erstellt:", res.data);
          setTasks(prevTasks => [...prevTasks, res.data]); 
        })
        .catch(err => console.error("Fehler beim Erstellen der Aufgabe:", err));
    };
  
  return (
    <div>
        {globalAdmin == 1 && (
          <div>
            <h2>Create Task</h2>
            <form onSubmit={handleCreateTask} className='formreg'>
              <input type="text" placeholder="Name der Aufgabe" value={nameTask} onChange={(e) => setNameTask(e.target.value)} required />
              <input type="text" placeholder="Beschreibung" value={descriptionTask} onChange={(e) => setDescriptionTask(e.target.value)} required />
              <input type="text" placeholder="Typ" value={typeTask} onChange={(e) => setTypeTask(e.target.value)} required />
              <input type="number" placeholder="Schwierigkeit" value={difficultyTask} onChange={(e) => setDifficultyTask(e.target.value)} required />
              <label>Mitarbeiter auswählen:</label>
              <ul>
                {users.map(user => (
                  <li key={user.id}>
                    <input
                      type="checkbox"
                      value={user.id}
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleUserSelect(user.id)}
                    />
                    <div>{user.name}</div>
                    <div>Stack: {user.stack}</div>
                    <div>Experience: {user.experience} Years</div>
                  </li>
                ))}
              </ul>
              <input type="date" value={deadlineTask} onChange={(e) => setDeadlineTask(e.target.value)} required />
              <button type='submit'>Aufgabe erstellen</button>
            </form>
          </div>
        )}
      
    </div>
  )
}

export default CreateTask
