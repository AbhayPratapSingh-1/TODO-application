import React from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './styles/App.css'; 

function App() {
    return (
        <div className="app-container"> 
            <TaskForm />
            <TaskList />
        </div>
    );
}

export default App;
