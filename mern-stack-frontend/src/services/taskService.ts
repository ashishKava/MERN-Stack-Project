import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/tasks',
});

export const getTasks = async () => {
  const response = await api.get('/');
  return response.data;
};

export const createTask = async (task: { title: string; description: string; state: string }) => {
  const response = await api.post('/', task);
  return response.data;
};

export const updateTask = async (task: { _id: string; title: string; description: string; state: string }) => {
  const response = await api.put(`/${task._id}`, task);
  return response.data;
};

export const deleteTask = async (id: string) => {
  await api.delete(`/${id}`);
};
