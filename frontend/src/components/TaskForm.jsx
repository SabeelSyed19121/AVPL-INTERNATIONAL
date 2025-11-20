import { useState } from 'react';
export default function TaskForm({ initial = {}, onSubmit }) {
  const [title, setTitle] = useState(initial.title || '');
  const [description, setDescription] = useState(initial.description || '');
  const [status, setStatus] = useState(initial.status || 'pending');

  const submit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, status });
    setTitle(''); setDescription(''); setStatus('pending');
  };

  return (
    <form onSubmit={submit} style={{marginBottom:16}}>
      <div>
        <input required value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title"/>
      </div>
      <div>
        <textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Description"/>
      </div>
      <div>
        <select value={status} onChange={e=>setStatus(e.target.value)}>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <button type="submit">Save</button>
    </form>
  );
}
