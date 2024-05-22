import React from 'react';
import { Task as TaskType } from '../contexts/TaskContext';
import '../styles/Task.css';

interface TaskProps {
  task: TaskType;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  return (
    <div className="task">
      <div className="task-title">{task.title}</div>
      <div className="task-description">{task.description}</div>
      <div className="task-state">{task.state}</div>
      {task.important && <div className="task-important">Important</div>}
    </div>
  );
};

export default Task;
