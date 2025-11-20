import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar(){
  const { user, logout } = useContext(AuthContext);
  const nav = useNavigate();

  const doLogout = () => {
    logout();
    nav('/login');
  }

  return (
    <nav>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', maxWidth:900, margin:'0 auto'}}>
        <div><Link to="/">Task Manager</Link></div>
        <div>
          {user ? (
            <>
              <span style={{marginRight:10}}>Hi, {user.username} ({user.role})</span>
              <button onClick={doLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
