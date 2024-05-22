import { Schema, model, Document } from 'mongoose';

interface ITask extends Document {
  title: string;
  description: string;
  state: 'TODO' | 'IN_PROGRESS' | 'DONE';
}

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  state: { type: String, enum: ['TODO', 'IN_PROGRESS', 'DONE'], default: 'TODO' }
});

const Task = model<ITask>('Task', taskSchema);

export default Task;
