import axios from 'axios';
const apiUrl = 'http://localhost:3000/api/tasks'; // Replace with your actual API URL

const getAllTasks = async () => {
    try {
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (err) {
        console.error('Error fetching tasks:', err);
        throw err;
    }
};

const createTask = async (taskData) => {
    try {
        const response = await axios.post(apiUrl, taskData);
        return response.data;
    } catch (err) {
        console.error('Error creating task:', err);
        throw err;
    }
};

const updateTask = async (taskId, updatedTask) => {
    try {
        const response = await axios.put(`${apiUrl}/${taskId}`, updatedTask);
        return response.data;
    } catch (err) {
        console.error('Error updating task:', err);
        throw err;
    }
};

export default {
    getAllTasks,
    createTask,
    updateTask
};
