import React, { createContext, useState, useEffect } from 'react';
import io from 'socket.io-client';
import { getTasks, createTask, updateTask, deleteTask } from '../services/taskService';

const socket = io('http://localhost:3001');

export interface Task {
  _id: string;
  title: string;
  description: string;
  state: 'TODO' | 'IN_PROGRESS' | 'DONE';
  important?: boolean;
}

export interface TaskContextProps {
  tasks: Task[];
  addTask: (task: Task) => void;
  editTask: (task: Task) => void;
  removeTask: (id: string) => void;
}

const defaultTaskContext: TaskContextProps = {
  tasks: [],
  addTask: () => {},
  editTask: () => {},
  removeTask: () => {},
};

export const TaskContext = createContext<TaskContextProps>(defaultTaskContext);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await getTasks();
      setTasks(tasks);
    };
    fetchTasks();

    socket.on('taskCreated', (task: Task) => setTasks((prev) => [...prev, task]));
    socket.on('taskUpdated', (updatedTask: Task) =>
      setTasks((prev) => prev.map((task) => (task._id === updatedTask._id ? updatedTask : task)))
    );
    socket.on('taskDeleted', (taskId: string) =>
      setTasks((prev) => prev.filter((task) => task._id !== taskId))
    );
  }, []);

  const addTask = async (task: Task) => {
    const newTask = await createTask(task);
    socket.emit('taskCreated', newTask);
  };

  const editTask = async (task: Task) => {
    const updatedTask = await updateTask(task);
    socket.emit('taskUpdated', updatedTask);
  };

  const removeTask = async (id: string) => {
    await deleteTask(id);
    socket.emit('taskDeleted', id);
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, editTask, removeTask }}>
      {children}
    </TaskContext.Provider>
  );
};
