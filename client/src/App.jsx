import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // Set User data
  const [message, setMessage] = useState('');
  const [globalName, setGlobalName] = useState('');
  const [globalID, setGlobalID] = useState('');
  const [globalAdmin, setGlobalAdmin] = useState('');

  // Show Tasks
  const [tasks, setTasks] = useState([]);

  // Register
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [stack, setStack] = useState('');
  const [experience, setExperience] = useState('');
  const [is_admin, setAdmin] = useState(false);

  // Login
  const [nameLogin, setNameLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');

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

  // schow all tasks
  useEffect(() => {
      axios.get("http://localhost:3000/")
        .then(response => {
          setTasks(response.data);
        })
        .catch(error => console.error("Fehler beim Abrufen der Aufgaben:", error));
    
  });
  

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

  const handleRegister = (e) => {
    e.preventDefault();

    const data = {
      name,
      age,
      email,
      password,
      stack,
      experience,
      is_admin: is_admin ? 1 : 0,
    };

    axios.post("http://localhost:3000/register", data)
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    axios.post("http://localhost:3000/login", { name: nameLogin, password: passwordLogin })
      .then((res) => {
        setMessage(res.data.message);
        setGlobalName(res.data.globalName);
        setGlobalID(res.data.globalID);
        setGlobalAdmin(res.data.globalAdmin);
      })
      .catch((error) => {
        setMessage(error.response?.data?.error);
      });
  };

  return (
    <>
      <div>
        <h2>Register</h2>
        <form onSubmit={handleRegister} className='formreg'>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="number" placeholder="Alter" value={age} onChange={(e) => setAge(e.target.value)} required />
          <input type="email" placeholder="E-Mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Passwort" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <input type="text" placeholder="Tech Stack" value={stack} onChange={(e) => setStack(e.target.value)} />
          <input type="number" placeholder="Erfahrung (Jahre)" value={experience} onChange={(e) => setExperience(e.target.value)} />
          <label>
            Admin:
            <input type="checkbox" checked={is_admin} onChange={(e) => setAdmin(e.target.checked)} />
          </label>
          <button type='submit'>Register</button>
        </form>

        <h2>Login</h2>
        <form onSubmit={handleLogin} className='formreg'>
          <input type="text" placeholder="Name" value={nameLogin} onChange={(e) => setNameLogin(e.target.value)} required />
          <input type="password" placeholder="Passwort" value={passwordLogin} onChange={(e) => setPasswordLogin(e.target.value)} required />
          <button type='submit'>Login</button>
        </form>
      </div>

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

        <h2>Aufgabenliste</h2>
        <div className='formreg'>
        {tasks.map((task) => (
          <ul key={task.id} >
            <li><strong>Name:</strong> {task.name}</li>
            <li><strong>Beschreibung:</strong> {task.description}</li>
            <li><strong>Erstellt von:</strong> {task.created_by}</li>
          </ul>
        ))}
        </div>

        <h2>Login Daten</h2>
        <div>{message}</div>
        <div><strong>User:</strong> {globalName}</div>
        <div><strong>ID:</strong> {globalID}</div>
        <div><strong>IS_ADMIN:</strong> {globalAdmin}</div>
      </div>
    </>
  );
}

export default App;
