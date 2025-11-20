export default function TaskCard({ task, onEdit, onDelete, showOwner }) {
  return (
    <div style={{border:'1px solid #ddd', padding:12, marginBottom:8, borderRadius:6}}>
      <h3>{task.title} <small style={{color:'#666'}}>({task.status})</small></h3>
      <p style={{whiteSpace:'pre-wrap'}}>{task.description}</p>
      {showOwner && <p><small>Owner: {task.owner || task.username || task.createdBy}</small></p>}
      <div style={{display:'flex', gap:8}}>
        {onEdit && <button onClick={() => onEdit(task)}>Edit</button>}
        {onDelete && <button onClick={() => onDelete(task.id)}>Delete</button>}
      </div>
    </div>
  );
}
