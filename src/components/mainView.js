import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, List, ListItem, ListItemText, IconButton, Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
const apiUrl = 'http://localhost:5000'; 
const MainView = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const fetchTasks = async () => {
    const response = await axios.get(`${apiUrl}/todos`);
    setTasks(response.data);
  };

  const addTask = async () => {
    if (newTask.trim()) {
      await axios.post(`${apiUrl}/todos`, { task: newTask });
      setNewTask('');
      fetchTasks();
    }
  };

  const updateTask = async (id, task, completed) => {
    await axios.put(`${apiUrl}/todos/${id}`, { task, completed });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${apiUrl}/todos/${id}`);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
      <h1>To-Do App</h1>
      <TextField
        fullWidth
        variant="outlined"
        label="Add a new task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && addTask()}
      />
      <Button variant="contained" color="primary" onClick={addTask} style={{ marginTop: '1rem' }}>
        Add Task
      </Button>
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Checkbox
              checked={task.completed}
              onChange={() => updateTask(task.id, task.task, !task.completed)}
            />
            <ListItemText primary={task.task} style={{ textDecoration: task.completed ? 'line-through' : 'none' }} />
            <IconButton edge="end" onClick={() => deleteTask(task.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default MainView;
