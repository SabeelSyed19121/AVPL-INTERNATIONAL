import { useState, useContext } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Register(){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setUser, setToken } = useContext(AuthContext);
  const nav = useNavigate();

  const doRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', { username, password });
      setToken(res.data.token);
      setUser(res.data.user);
      nav('/');
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div style={{maxWidth:600, margin:'0 auto'}}>
      <h2>Register</h2>
      <form onSubmit={doRegister}>
        <input required value={username} onChange={e=>setUsername(e.target.value)} placeholder="username"/>
        <input required type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="password"/>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
