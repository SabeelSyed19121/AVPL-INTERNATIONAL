import { useEffect, useState, useContext } from 'react';
import API from '../services/api';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import { AuthContext } from '../context/AuthContext';

export default function Dashboard(){
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [editing, setEditing] = useState(null);

  const load = async () => {
    try {
      const res = await API.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || err.message);
    }
  };

  useEffect(() => { load(); }, []);

  const create = async (payload) => {
    await API.post('/tasks', payload);
    load();
  };

  const update = async (id, payload) => {
    await API.put(`/tasks/${id}`, payload);
    setEditing(null);
    load();
  };

  const remove = async (id) => {
    if (!confirm('Delete task?')) return;
    await API.delete(`/tasks/${id}`);
    load();
  };

  return (
    <div>
      <h2>Dashboard - {user?.role}</h2>

      <h3>Create Task</h3>
      <TaskForm onSubmit={create} />

      <h3>Tasks</h3>
      {tasks.length === 0 && <p>No tasks yet.</p>}
      {tasks.map(t => (
        <TaskCard
          key={t.id}
          task={t}
          showOwner={user?.role === 'admin'}
          onEdit={() => setEditing(t)}
          onDelete={remove}
        />
      ))}

      {editing && (
        <div>
          <h3>Edit Task</h3>
          <TaskForm initial={editing} onSubmit={(data)=>update(editing.id, data)} />
          <button onClick={()=>setEditing(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
}
