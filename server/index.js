const express = require("express");
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

const cors = require("cors");
app.use(bodyParser.json());
app.use(cors());
///try

// Database connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ProjectHub'
}).promise();




// Show tasks 
app.get("/", async (req, res) => {
  const [tasks] = await connection.query("SELECT * FROM Task");
  res.json(tasks);
});


// Register
app.post("/register", async (req, res) => {
  const { name, age, email, password, stack, experience, is_admin } = req.body;
  try {
    await connection.query(
      "INSERT INTO Users (name, age, email, password, stack, experience, is_admin) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, age, email, password, stack, experience, is_admin]
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
app.post("/login", async (req, res) => {
  const {name, password } = req.body;

  try {
    const [users] = await connection.query("SELECT id, name, is_admin FROM Users WHERE  name = ? AND password = ?", [ name, password]);

    if (users.length > 0) {
      res.json({ message: "Login erfolgreich" , globalName: name, globalID: users[0].id, globalAdmin: users[0].is_admin});

    } else {
      res.status(401).json({ error: "Ungültiger Name oder Passwort", globalName: ""});
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//show all Users
app.get("/users", async (req, res) => {
  try {
    const [users] = await connection.query("SELECT id, name, stack, experience FROM Users");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//createTask

app.post("/createTask", async (req, res) => {
  const { nameTask, descriptionTask, createdBy, typeTask, difficultyTask, deadlineTask, assignedUsers } = req.body;

  try {
    const [taskResult] = await connection.query(
      "INSERT INTO Task (name, description, created_by, type, difficulty, deadline) VALUES (?, ?, ?, ?, ?, ?)",
      [nameTask, descriptionTask, createdBy, typeTask, difficultyTask, deadlineTask]
    );

    const taskId = taskResult.insertId;

    for (const userId of assignedUsers) {
      await connection.query("INSERT INTO TaskAssignments (task_id, user_id) VALUES (?, ?)", [taskId, userId]);
    }

    res.json({ message: "Aufgabe erfolgreich erstellt", taskId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



app.listen(PORT, () => {
    console.log(`PORT: ${PORT}`);
});