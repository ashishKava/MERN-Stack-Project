import { Router } from 'express';
import Task from '../Models/userModel';

const router = Router();

router.get('/', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

router.post('/', async (req, res) => {
  const { title, description } = req.body;
  const task = new Task({ title, description });
  await task.save();
  res.json(task);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, state } = req.body;
  const task = await Task.findByIdAndUpdate(id, { title, description, state }, { new: true });
  res.json(task);
});

router.delete('/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
});

export default router;
