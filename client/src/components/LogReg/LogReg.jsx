import React, { useState, useEffect } from 'react';
import axios from 'axios';



function LogReg() {

      // Set User data
  const [message, setMessage] = useState('');
  const [globalName, setGlobalName] = useState('');
  const [globalID, setGlobalID] = useState('');
  const [globalAdmin, setGlobalAdmin] = useState('');



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
  
        // Werte in localStorage speichern
        localStorage.setItem("globalName", res.data.globalName);
        localStorage.setItem("globalID", res.data.globalID);
        localStorage.setItem("globalAdmin", res.data.globalAdmin);
      })
      .catch((error) => {
        setMessage(error.response?.data?.error);
      });
  };

  useEffect(() => {
    setGlobalName(localStorage.getItem("globalName") || '');
    setGlobalID(localStorage.getItem("globalID") || '');
    setGlobalAdmin(localStorage.getItem("globalAdmin") || '');
  }, []);

  const handleLogout = () => {
    setGlobalName('');
    setGlobalID('');
    setGlobalAdmin('');
    localStorage.removeItem("globalName");
    localStorage.removeItem("globalID");
    localStorage.removeItem("globalAdmin");
  };
  
  



  return (
    <div>
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
        

        

        <h2>Login Daten</h2>
        <div>{message}</div>
        <div><strong>User:</strong> {globalName}</div>
        <div><strong>ID:</strong> {globalID}</div>
        <div><strong>IS_ADMIN:</strong> {globalAdmin}</div>
        <div>
  {globalID ? (
    <button onClick={handleLogout}>Logout</button>
  ) : null}
</div>
       
        
      </div>
      
    </div>
  )
}

export default LogReg
