import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './Navbar';
import View1 from './View1';
import View2 from './View2';
import View3 from './View3';
import Info from './Info';

function App() {
  const [activeView, setActiveView] = useState('view1');
  const [tasks, setTasks] = useState([]);
  const [editedTaskId, setEditedTaskId] = useState(null);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskTags, setNewTaskTags] = useState([]);
  const [newTagName, setNewTagName] = useState('');

  const handleSaveChanges = () => {
    tasks.forEach((task) => {
      updateTask(task.id, task);
    });
  };

  useEffect(() => {
    // Fetch tasks from the local backend server
    fetch('http://localhost:3010/tasks')
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error('Error fetching tasks:', error));
  }, []);


   async function updateTask(taskId, updatedTaskData) {
    try {
      const response = await fetch(`http://localhost:3010/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTaskData),
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  }


  const handleEditTaskName = (taskId, newName) => {
    // Update the task name in the local state
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, name: newName } : task
    );
    setTasks(updatedTasks);

    // Make an API call to update the task on the server
    updateTask(taskId, { name: newName, tags: tasks.find((task) => task.id === taskId).tags });
  };

  const handleAddTag = (taskId, newTag) => {
    // Update the tags for a task based on taskId in your tasks state
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, tags: [...task.tags, newTag] } : task
    );
    setTasks(updatedTasks);
  };

  const handleRemoveTag = (taskId, tagToRemove) => {
    // Remove a specific tag from a task based on taskId in the tasks state
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? { ...task, tags: task.tags.filter((tag) => tag !== tagToRemove) }
        : task
    );
    setTasks(updatedTasks);
  };

  const handleCreateNewTag = () => {
    // Create a new tag and add it to the tags state
    setNewTaskTags([...newTaskTags, newTagName]);
    setNewTagName('');
  };

  const handleAddNewTask = () => {
    // Create a new task and add it to the tasks state
    const newTask = {
      id: tasks.length + 1,
      name: newTaskName,
      tags: newTaskTags,
    };
    setTasks([...tasks, newTask]);
    setNewTaskName('');
    setNewTaskTags([]);
  };

  const handleRemoveTask = (taskId) => {

    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const getView = () => {
    switch (activeView) {
      case 'view1':
        return <View1 />;
      case 'view2':
        return <View2 />;
      case 'view3':
        return <View3 />;
      case 'info':
        return <Info />;
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <Navbar setActiveView={setActiveView} />
      {getView()}

      <div className="view-container">
        <div className="task-list">
          {activeView !== 'info' && (
            <div>
             <h1>Task List</h1>
              <ul>

                {tasks.map((task) => (
                  <li key={task.id}>
                    {editedTaskId === task.id ? (
                      <input
                        type="text"
                        value={task.name}
                        onChange={(e) => handleEditTaskName(task.id, e.target.value)}
                      />
                    ) : (
                      <div>
                        <strong>Name:</strong> {task.name}
                      </div>
                    )}
                    <strong>Tags:</strong> {task.tags.join(', ')}
                    {editedTaskId === task.id ? (
                      <button onClick={() => setEditedTaskId(null)}>Cancel</button>
                    ) : (
                      <button onClick={() => setEditedTaskId(task.id)}>Edit Name</button>
                    )}
                    <button onClick={() => handleRemoveTask(task.id)}>Remove Task</button>
                  </li>
                ))}
              </ul>
              <h2>Add New Task</h2>
              <input
                type="text"
                placeholder="Task Name"
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Tags (comma-separated)"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
              />
              <button onClick={handleCreateNewTag}>Create New Tag</button>
              <button onClick={handleAddNewTask}>Add New Task</button>
            </div>
          )}
        </div>
        <div className="info">
          {activeView === 'info' && <div></div>}
        </div>
      </div>
    </div>
  );
}

export default App;
