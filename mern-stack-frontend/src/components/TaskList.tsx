import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import Task from './Task';
import { Task as TaskType } from '../contexts/TaskContext';
import '../styles/TaskList.css';

interface TaskListProps {
  tasks: TaskType[];
  state: 'TODO' | 'IN_PROGRESS' | 'DONE';
}

const TaskList: React.FC<TaskListProps> = ({ tasks, state }) => {
  return (
    <div>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <Draggable key={task._id} draggableId={task._id} index={index}>
            {(provided) => (
              <li
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className="task-item"
              >
                <Task task={task} />
              </li>
            )}
          </Draggable>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
