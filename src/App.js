import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [filter, setFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (newTask.title.trim() !== '') {
      setTasks([...tasks, { ...newTask, completed: false }]);
      setNewTask({ title: '', description: '' });
    }
  };

  const handleRemoveTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleToggleTask = (index) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    const titleA = a.title.toLowerCase();
    const titleB = b.title.toLowerCase();
    if (titleA < titleB) return sortOrder === 'asc' ? -1 : 1;
    if (titleA > titleB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredTasks = sortedTasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'todo') return !task.completed;
    return true;
  });

  return (
    <div className="App">
      <h1>My todos</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input
              type="text"
              placeholder="What's the task title?"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
            />
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input
              type="text"
              placeholder="What's the task description?"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
            />
          </div>
          <div className="todo-input-item">
            <button type="button" className="primaryBtn" onClick={handleAddTask}>
              Add
            </button>
          </div>
        </div>
        <div className="btn-area">
          <button onClick={() => handleFilterChange('all')}>All</button>
          <button onClick={() => handleFilterChange('todo')}>Todo</button>
          <button onClick={() => handleFilterChange('completed')}>Completed</button>
          <button onClick={() => handleSortChange(sortOrder === 'asc' ? 'desc' : 'asc')}>
            Sort {sortOrder === 'asc' ? 'Descending' : 'Ascending'}
          </button>
        </div>
        <div className="todo-list">
          {filteredTasks.map((task, index) => (
            <div key={index} className={`task ${task.completed ? 'completed' : ''}`}>
              <h3 onClick={() => handleToggleTask(index)}>{task.title}</h3>
              <p>{task.description}</p>
              <button onClick={() => handleRemoveTask(index)}>Remove</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
