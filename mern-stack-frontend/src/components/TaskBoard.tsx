import React, { useContext } from 'react';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import TaskList from './TaskList';
import { TaskContext, TaskContextProps } from '../contexts/TaskContext';
import '../styles/TaskBoard.css';

const TaskBoard: React.FC = () => {
  const context = useContext(TaskContext);

  const { tasks, editTask } = context as TaskContextProps;

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    const task = tasks.find((task) => task._id === draggableId);
    if (task && destination.droppableId !== source.droppableId) {
      task.state = destination.droppableId as 'TODO' | 'IN_PROGRESS' | 'DONE';
      editTask(task);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="task-board">
        {['TODO', 'IN_PROGRESS', 'DONE'].map((state) => (
          <Droppable droppableId={state} key={state}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="task-column"
              >
                <h2>{state.replace('_', ' ')}</h2>
                <TaskList tasks={tasks.filter((task) => task.state === state)} state={state as 'TODO' | 'IN_PROGRESS' | 'DONE'} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default TaskBoard;
