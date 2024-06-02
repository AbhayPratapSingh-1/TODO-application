// TaskList.js
import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import taskService from '../services/taskService';

function TaskList() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const data = await taskService.getAllTasks();
            setTasks(data);
        };
        fetchTasks();
    }, []);

    return (
        <div>
            <h1>Todo List</h1>
            <ul>
                {tasks.map(task => (
                    <TaskItem key={task._id} task={task} />
                ))}
            </ul>
        </div>
    );
}

export default TaskList;

// TaskForm.js
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import taskService from '../services/taskService';

function TaskForm() {
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const handleSubmit = async (e) => {
        e.preventDefault();
        await taskService.createTask({ title, startDate, endDate });
        setTitle('');
        setStartDate(new Date());
        setEndDate(new Date());
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Title:</label>
                <input 
                    type="text" 
                    id="title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <label htmlFor="startDate">Start Date:</label>
                <DatePicker
                    id="startDate"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    required
                />
            </div>
            <div>
                <label htmlFor="endDate">End Date:</label>
                <DatePicker
                    id="endDate"
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    required
                />
            </div>
            <button type="submit">Create Task</button>
        </form>
    );
}

export default TaskForm;

// TaskItem.js
import React, { useState } from 'react';
import taskService from '../services/taskService';

function TaskItem({ task }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState({ ...task }); 

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            await taskService.updateTask(task._id, editedTask);
            setIsEditing(false);
        } catch (err) {
            console.error('Error updating task:', err);
        }
    };

    const handleChange = (e) => {
        setEditedTask({ ...editedTask, [e.target.name]: e.target.value });
    };

    return (
        <li>
            {isEditing ? (
                <div>
                    <input 
                        type="text" 
                        name="title" 
                        value={editedTask.title} 
                        onChange={handleChange} 
                    />
                    <button onClick={handleSave}>Save</button>
                </div>
            ) : (
                <div>
                    {task.title} 
                    <button onClick={handleEdit}>Edit</button>
                </div>
            )}
        </li>
    );
}

export default TaskItem;
