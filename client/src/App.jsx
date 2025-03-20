import React from 'react';
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from './components/Sidebar/Sidebar';
import LogReg from './components/LogReg/LogReg';
import Tasks from './components/Tasks/Tasks';
import CreateTask from './components/CreateTask/CreateTask';


function App() {


  return (
    <>
     
      <BrowserRouter>
      <div className="containerBR">
        <Sidebar />
        <div className="contentBR">
          <Routes>
            <Route path="/log" element={<LogReg />} />
            <Route path="/" element={<Tasks />} />
            <Route path="/create" element={<CreateTask />} />
          </Routes>
        </div>
      </div>
      </BrowserRouter>
    </>
  );
}

export default App;
