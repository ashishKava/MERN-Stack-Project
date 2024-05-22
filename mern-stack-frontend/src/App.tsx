import React from 'react';
import { TaskProvider } from './contexts/TaskContext';
import TaskBoard from './components/TaskBoard';
import './styles/App.css';

const App: React.FC = () => {
  return (
    <TaskProvider>
      <div className="App">
        <h1>Task Manager</h1>
        <TaskBoard />
      </div>
    </TaskProvider>
  );
};

export default App;
